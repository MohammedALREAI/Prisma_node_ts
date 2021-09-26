import createError from 'http-errors';
import prisma from '../db/prisma';
import logger from '../logger';
import { generateRandomToken } from '../helpers';

import  UserService from '../services/user-service';
import  BoatService from '../services/boat-service';
import  UserRoleService from '../services/user-role-service';
import  * as UserTokenService from '../services/user-token-service';
import  OwnerService from '../services/owner-service';
import  BoatOwnerService from '../services/boat-owner-service';
import  BoatGuestService from '../services/boat-guest-service';
import EmailService from './email-service';

/**
 * @class TransferBoatService
 */






export  default class TransferBoatService{


/**
 * @transferBoatFromApp
 * @param hin 
 * @param email 
 * @param dealershipName 
 * 
 */

static transferBoatFromApp = async (hin, email, dealershipName) => {
  try {
    await prisma.$transaction(async prisma => {
      const boat = await BoatService.getBoatByHin(hin);
      await this.deletePreviousBoatOwnerUserRoleAndOwnerIfNeeded(boat);
      await BoatGuestService.deleteBoatGuests(boat);
      const isTransferToDealership = dealershipName ? true : false;
      if (isTransferToDealership) {
        return await this.transferBoatToDealership(boat, dealershipName);
      }
      const user = await UserService.getUserByEmail(
        email,
        { userRoles: true },
      );
      if (user) {
        return await (this.transferBoatToExistingUser(user, boat))
      } else {
        return await (this.transferBoatToNewUser({ email: email }, boat))
      }
    });
  } catch (err) {
    logger.error(err);
    throw err;
  }
};



/**
 * @function transferBoatFromDealersCircle
 * @param hin 
 * @param componentData 
 */
static transferBoatFromDealersCircle = async (hin, componentData) => {
  try {
    const email = componentData.Customer.Email;
    await this.createDealersCircleComponent(componentData);

    await prisma.$transaction(async prisma => {
      const boat = await BoatService.getBoatByHin(hin);
      const user = await UserService.getUserByEmail(email,{ dealer: true });
      

      if (user &&   (user as any).dealer) {
        //TODO send email saying dealer entered their email
        throw createError(500, `Dealer: ${email} entered in their own email`);
      }
      await this.deletePreviousBoatOwnerUserRoleAndOwnerIfNeeded(boat);
      await BoatGuestService.deleteBoatGuests(boat);
      if (user) {
        return await (this.transferBoatToExistingUser(user, boat));
      } else {
        const userData = (this.getUserDataFromDCComponent(componentData));
        return await (this.transferBoatToNewUser(userData, boat))
      }
    });
  } catch (err) {
    logger.error(err);
    throw err;
  }
};


/**
 * @function createDealersCircleComponent
 * @param componentData 
 */

static createDealersCircleComponent = async componentData => {
  try {
    await prisma.dealersCircleComponent.create({
      data: {
        companyId: parseInt(componentData.CompanyID),
        supplierManufacturerPartId: parseInt(
          componentData.SupplierManufacturerPartID
        ),
        supplierManufacturerPartNumber:
          componentData.SupplierManufacturerPartNumber,
        componentUnqiueIdentifier: componentData.ComponentUniqueIdentifier,
        oemUniqueIdentified: componentData.OEMUniqueIdentifier,
        oemMake: componentData.OEMMake,
        oemModelYear: parseInt(componentData.OEMModelYear),
        oemModelName: componentData.OEMModelName,
        deliveredDate: new Date(componentData.DeliveredDate),
        deliveryEntryDate: new Date(componentData.DeliveryEntryDate),
        dealerName: componentData.DealerName,
        salesPersonEmail: componentData.SalesPersonEmail,
        recievedOwnersManual:
          componentData.FormDataFields.Field[0].value === 'true' ? true : false,
        understandResponsiblilityOwnersManual:
          componentData.FormDataFields.Field[1].value === 'true' ? true : false,
        recievedWarrantyStatementAndAgree:
          componentData.FormDataFields.Field[2].value === 'true' ? true : false,
        agreeToPrivacyPolicy:
          componentData.FormDataFields.Field[3].value === 'true' ? true : false,
        consentToDataCollection:
          componentData.FormDataFields.Field[4].value === 'true' ? true : false,
        customerId: parseInt(componentData.Customer.CustomerID),
        firstName: componentData.Customer.FirstName,
        lastName: componentData.Customer.LastName,
        address1: componentData.Customer.Address1,
        address2: componentData.Customer.Address2,
        city: componentData.Customer.City,
        state: componentData.Customer.State,
        stateCode: componentData.Customer.StateCode,
        postalCode: componentData.Customer.PostalCode,
        country: componentData.Customer.Country,
        countryCode: componentData.Customer.CountryCode,
        homePhone: componentData.Customer.HomePhone,
        mobilePhone: componentData.Customer.MobilePhone,
        email: componentData.Customer.Email,
        individualOrCompany:
          componentData.Customer.IndividualOrCompany === 'true' ? true : false
      }
    });
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

/**
 *  @function transferBoatToDealership
 * @param boat 
 * @param dealershipName 
 * @returns 
 */

static transferBoatToDealership = async (boat, dealershipName) => {
  try {
    const dealership = await prisma.dealership.findFirst({
      where: {
        dealerName: dealershipName
      }
    });
    await BoatService.setBoatsNewDealerId(boat, dealership);
    return `Boat ${boat.hin} transferred to dealership`;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};


/**
 *  @function deletePreviousBoatOwnerUserRoleAndOwnerIfNeeded
 * @param boat 
 */

 static  deletePreviousBoatOwnerUserRoleAndOwnerIfNeeded = async (boat) => {
  try {
    const previousBoatOwner = await BoatOwnerService.deleteAndReturnPreviousBoatOwner(
      boat);
    console.log(previousBoatOwner);
    if (previousBoatOwner) {
      //check if still a boat owner
      const isPreviousBoatOwnerStillABoatOwner = await BoatOwnerService.checkIfPreviousBoatOwnerStillABoatOwner(
        previousBoatOwner.ownerId);
      if (!isPreviousBoatOwnerStillABoatOwner) {
        const previousOwner = await OwnerService.getOwner(
          previousBoatOwner.ownerId);
        await OwnerService.deleteOwner(previousOwner.id);
        await UserRoleService.deleteUserRoleAsOwner(previousOwner);
      }
    }
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

static transferBoatToExistingUser = async (user, boat) => {
  try {
    const newOwnerIsExistingOwner = await prisma.owner.findUnique({
      where: { userId: user.id }
    });
    if (newOwnerIsExistingOwner) {
      await BoatOwnerService.createBoatOwner(
        newOwnerIsExistingOwner,
        boat);
    } else {
      const newOwner = await OwnerService.createOwner(user);
      await BoatOwnerService.createBoatOwner(newOwner, boat);
      await UserRoleService.createUserRoleAsOwner(user);
    }
    await EmailService.sendTransferEmailToExistingUser(user, boat);
    logger.info(
      `Boat ${boat.hin} was transferred to existing user ${user.email}`
    );
    return 'Boat transferred to Existing User';
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

/**
 *  @function getUserDataFromDCComponent
 * @param componentData 
 * @returns 
 */

static getUserDataFromDCComponent = componentData => {
  return {
    name: `${componentData.Customer.FirstName} ${componentData.Customer.LastName}`,
    address: `${componentData.Customer.Address1}, ${componentData.Customer.Address2}`,
    city: componentData.Customer.City,
    state: componentData.Customer.State,
    postalCode: componentData.Customer.PostalCode,
    isRegistered: false,
    country: componentData.Customer.Country,
    phone: componentData.Customer.MobilePhone,
    email: componentData.Customer.Email
  };
};


/**
 *  @function transferBoatToNewUser
 * @param userData 
 * @param boat 
 * @returns 
 */

static transferBoatToNewUser = async (userData, boat) => {
  try {
    const user = await UserService.createUser(userData);
    await UserRoleService.createUserRoleAsOwner(user);
    const owner = await OwnerService.createOwner(user);
    await BoatOwnerService.createBoatOwner(owner, boat);
    const userToken = await UserTokenService.createUserToken(user);
    await EmailService.sendTransferEmailToNewUser(user, userToken, boat);
    logger.info(
      `Boat ${boat.hin} was transferred to new user ${userData.email}`
    );
    return 'Boat transferred to New User';
  } catch (err) {
    logger.error(err);
    throw err;
  }
};




}