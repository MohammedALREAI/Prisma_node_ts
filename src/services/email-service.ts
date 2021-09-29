import logger from '../lib/logger';
import axios from 'axios';
import sgMail from '@sendgrid/mail';
import { ClientSession } from 'mongoose';

const DEV_CUSTOMER_EMAIL = 'khussell@osmosis.io';
const SUPPORT_EMAIL = 'support@centurionrecon.com';
const VERIFICATION_EMAIL = 'support@centurionrecon.com';

const isDev = process.env.NODE_ENV !== 'production';

sgMail.setApiKey(process.env.SENDGRID_URI as string);

//config for emails to be sent with a dynamic template
const config = {
  headers: {
    'content-type': 'application/json',
    authorization: `Bearer ${process.env.SENDGRID_URI}`
  }
};

interface ISendTechEmail{
  fullName: string,
  email: string,
  subject: string,
  message: string

}




export default  class EmailService{



static sendTechEmail = async ({fullName,email,subject,message}:ISendTechEmail) => {
  try {
    const body =  this.getTechSupportEmailBody({fullName, email, subject, message});
    const emailSent = await axios.post(
      'https://api.sendgrid.com/v3/mail/send',
      body,
      config
    );
    console.log(emailSent);
    logger.info('Tech support email was sent');
  } catch (err) {
    logger.info(err.message);
    throw new Error(err.message);
  }
}


static getTechSupportEmailBody = ({fullName,email,subject,message}:ISendTechEmail) => {
  return {
    personalizations: [
      {
        to: [
          {
            email: SUPPORT_EMAIL,
            name: 'Centurion RECON Support'
          }
        ],
        dynamic_template_data: {
          subject: subject,
          supportMessage: message,
          supportCustomer: fullName,
          supportCustomerEmail: email
        },
        subject: subject
      }
    ],
    from: {
      email: SUPPORT_EMAIL,
      name: fullName
    },
    reply_to: {
      email: email,
      name: fullName
    },
    template_id: 'd-828c1639789a43cea3af1331bd0cd586'
  };
};

static sendGuestUserInviteEmail = async (
  type: string,
  bodyData: { email: string; inviter: string; code: string }
) => {
  let body;
  switch (type) {
    case 'newUser':
      body = this.getNewUserAsGuestUserEmailBody(bodyData);
      break;
    case 'existingUser':
      body = this.getExistingUserAsGuestUserEmailBody(bodyData);
      break;
    default:
      return;
  }
  try {
    await axios.post('https://api.sendgrid.com/v3/mail/send', body, config);
    logger.info('Email was sent.');
  } catch (err) {
    logger.info(err.message);
    throw new Error(err.message);
  }
};

static sendTransferEmailToNewUser = async (user, userToken, boat) => {
  const emailSetupData = {
    email: user.email,
    myear: boat.modelYear,
    code: userToken.token
  };
  const body = this.getEmailBodyForTransferToNewUser(emailSetupData);

  try {
    await axios.post('https://api.sendgrid.com/v3/mail/send', body, config);
    logger.info('Email was sent.');
  } catch (err) {
    logger.info(err.message);
    throw new Error(err.message);
  }
};

static sendTransferEmailToExistingUser = async (
  user,
  boat
): Promise<void> => {
  const emailSetupData = {
    email: user.email,
    myear: boat.modelYear
  };
  const body = this.getEmailBodyForTransferToExistingUser(emailSetupData);

  try {
    await axios.post('https://api.sendgrid.com/v3/mail/send', body, config);
    logger.info('Email was sent.');
  } catch (err) {
    logger.info(err.message);
    throw new Error(err.message);
  }
};



/**

 */
static getNewUserAsGuestUserEmailBody = (bodyData: {
  email: string;
  inviter: string;
  code: string;
}) => {
  return {
    personalizations: [
      {
        to: [
          {
            email: isDev ? DEV_CUSTOMER_EMAIL : bodyData.email,
            name: isDev ? DEV_CUSTOMER_EMAIL : bodyData.email
          }
        ],
        dynamic_template_data: {
          inviter: bodyData.inviter,
          code: bodyData.code
        },
        subject: "You've been invited to Centurion RECON"
      }
    ],
    from: {
      email: VERIFICATION_EMAIL,
      name: 'Centurion RECON'
    },
    reply_to: {
      email: VERIFICATION_EMAIL,
      name: 'Centurion RECON'
    },
    asm: {
      group_id: 16050
    },
    template_id: 'd-25d05118c5c64849b9d96151560d0c56'
  };
};

static getExistingUserAsGuestUserEmailBody = (bodyData: {
  email: string;
  inviter: string;
}) => {
  return {
    personalizations: [
      {
        to: [
          {
            email: isDev ? DEV_CUSTOMER_EMAIL : bodyData.email,
            name: isDev ? DEV_CUSTOMER_EMAIL : bodyData.email
          }
        ],
        dynamic_template_data: {
          inviter: bodyData.inviter
        },
        subject: "You've been invited to Centurion RECON"
      }
    ],
    from: {
      email: VERIFICATION_EMAIL,
      name: 'Centurion RECON'
    },
    reply_to: {
      email: VERIFICATION_EMAIL,
      name: 'Centurion RECON'
    },
    asm: {
      group_id: 16050
    },
    template_id: 'd-660f4f52ef1d41cc9f02523a20d6fe69'
  };
};

static getEmailBodyForTransferToNewUser = (bodyData: {
  email: string;
  myear: string;
  code: string | undefined;
}) => {
  return {
    personalizations: [
      {
        to: [
          {
            email: isDev ? DEV_CUSTOMER_EMAIL : bodyData.email,
            name: isDev ? DEV_CUSTOMER_EMAIL : bodyData.email
          }
        ],
        dynamic_template_data: {
          myear: bodyData.myear,
          code: bodyData.code
        },
        subject: 'Welcome to Centurion RECON'
      }
    ],
    from: {
      email: VERIFICATION_EMAIL,
      name: 'Centurion RECON'
    },
    reply_to: {
      email: VERIFICATION_EMAIL,
      name: 'Centurion RECON'
    },
    asm: {
      group_id: 16050
    },
    template_id: 'd-e41c5471568840ebbefb4683e504f070'
  };
};

static getEmailBodyForTransferToExistingUser = (bodyData: {
  email: string;
  myear: string;
}) => {
  return {
    personalizations: [
      {
        to: [
          {
            email: isDev ? DEV_CUSTOMER_EMAIL : bodyData.email,
            name: isDev ? DEV_CUSTOMER_EMAIL : bodyData.email
          }
        ],
        dynamic_template_data: {
          myear: bodyData.myear
        },
        subject: 'Welcome to Centurion RECON'
      }
    ],
    from: {
      email: VERIFICATION_EMAIL,
      name: 'Centurion RECON'
    },
    reply_to: {
      email: VERIFICATION_EMAIL,
      name: 'Centurion RECON'
    },
    asm: {
      group_id: 16050
    },
    template_id: 'd-70c75d88e2ca4c7c8a5f0314e8a36d7c'
  };
}
}
