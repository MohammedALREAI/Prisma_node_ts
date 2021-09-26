-- CreateTable
CREATE TABLE "Boat" (
    "id" SERIAL NOT NULL,
    "dealershipId" INTEGER,
    "hin" TEXT NOT NULL,
    "model" TEXT,
    "modelYear" TEXT,
    "engineModel" TEXT,
    "gelDate" TIMESTAMP(3),
    "deliveryDate" TIMESTAMP(3),
    "deliveryEntryDate" TIMESTAMP(3),
    "modifiedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,

    CONSTRAINT "Boat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dealership" (
    "id" SERIAL NOT NULL,
    "code" INTEGER,
    "dealer" TEXT,
    "brand" TEXT,
    "region" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "postalCode" TEXT,
    "country" TEXT,
    "phone" TEXT,
    "name" TEXT,
    "email" TEXT,
    "websiteUrl" TEXT,
    "modifiedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Dealership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" SERIAL NOT NULL,
    "serial" TEXT,
    "sim" TEXT,
    "region" TEXT,
    "modifiedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDisabled" BOOLEAN NOT NULL DEFAULT false,
    "profile" TEXT,
    "provider" TEXT,
    "unitDescription" TEXT,
    "partNumber" TEXT,
    "provisionedDate" TIMESTAMP(3),
    "gsm" TEXT,
    "who" TEXT,
    "shippedDate" TIMESTAMP(3),
    "invoiceNumber" INTEGER,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "country" TEXT,
    "city" TEXT,
    "state" TEXT,
    "isRegistered" BOOLEAN NOT NULL DEFAULT false,
    "postalCode" TEXT,
    "modifiedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uid" TEXT NOT NULL DEFAULT E'newid()',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,
    "modifiedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dealer" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "dealershipId" INTEGER NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Dealer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guest" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Owner" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoatAdmin" (
    "id" SERIAL NOT NULL,
    "adminId" INTEGER NOT NULL,
    "boatId" INTEGER NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BoatAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoatGuest" (
    "id" SERIAL NOT NULL,
    "boatId" INTEGER NOT NULL,
    "guestId" INTEGER NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BoatGuest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoatOwner" (
    "id" SERIAL NOT NULL,
    "boatId" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BoatOwner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeviceTelemetry" (
    "id" SERIAL NOT NULL,
    "deviceId" INTEGER NOT NULL,
    "accelX" DOUBLE PRECISION,
    "accelXyzMagnitude" DOUBLE PRECISION,
    "accelY" DOUBLE PRECISION,
    "accelZ" DOUBLE PRECISION,
    "analogInput1" DOUBLE PRECISION,
    "analogInput2" DOUBLE PRECISION,
    "analogInput3" DOUBLE PRECISION,
    "analogInput4" DOUBLE PRECISION,
    "digitalInput1" INTEGER,
    "digitalInput2" INTEGER,
    "digitalInput3" INTEGER,
    "digitalInput4" INTEGER,
    "digitalOutput1" INTEGER,
    "digitalOutput2" INTEGER,
    "gpsAltitudeFt" INTEGER,
    "gpsAltitudeM" INTEGER,
    "gpsCourse" DOUBLE PRECISION,
    "gpsDate" DOUBLE PRECISION,
    "gpsLatitude" DOUBLE PRECISION,
    "gpsLongitude" DOUBLE PRECISION,
    "gpsMode" INTEGER,
    "gpsModeStr" TEXT,
    "gpsNumSatellites" INTEGER,
    "gpsSpeedKmh" DOUBLE PRECISION,
    "gpsSpeedMph" DOUBLE PRECISION,
    "gpsTime" INTEGER,
    "gpsUtc" BIGINT,
    "gpsUtcDays" INTEGER,
    "gpsUtcSec" INTEGER,
    "gpsUtcStr" TEXT,
    "gpsWarn" TEXT,
    "gsmAccessTechnology" TEXT,
    "gsmConnected" INTEGER,
    "gsmRegStatus" TEXT,
    "gsmSignalQualityBars" INTEGER,
    "gsmSignalQualityDBm" INTEGER,
    "gsmSignalQualityStr" TEXT,
    "gsmSimStatus" TEXT,
    "input1DutyCycle" INTEGER,
    "input1Frequency" DOUBLE PRECISION,
    "sysSerial" INTEGER,
    "sysType" TEXT,
    "sysVariant" INTEGER,
    "tempC" DOUBLE PRECISION,
    "tempF" DOUBLE PRECISION,
    "acceleratorPedalPosition1" DOUBLE PRECISION,
    "actualEnginePercentTorque" INTEGER,
    "actualEnginePercentTorqueHighResolution" DOUBLE PRECISION,
    "altitude" DOUBLE PRECISION,
    "amberWarningLamp" INTEGER,
    "ambientAirTemperature" DOUBLE PRECISION,
    "barometricAbsolutePressure" DOUBLE PRECISION,
    "barometricPressure" DOUBLE PRECISION,
    "batteryPotentialPowerInput" DOUBLE PRECISION,
    "brakeSwitch" INTEGER,
    "calculatedAmbientAirTemperature" DOUBLE PRECISION,
    "clutchSwitch" INTEGER,
    "compassBearing" DOUBLE PRECISION,
    "cruiseControlActive" INTEGER,
    "cruiseControlEnableSwitch" INTEGER,
    "cruiseControlPauseSwitch" INTEGER,
    "day" DOUBLE PRECISION,
    "disengageDrivelineRequest" INTEGER,
    "drivelineRetarderOverheatIndicator" INTEGER,
    "ecuSerialNumber" INTEGER,
    "engineActualIgnitionTiming" DOUBLE PRECISION,
    "engineAirFilter1DifferentialPressure" DOUBLE PRECISION,
    "engineAirFilterRestrictionLampData" INTEGER,
    "engineAirIntakePressure" INTEGER,
    "engineAirIntakeTemperature" INTEGER,
    "engineAmberWarningLampData" INTEGER,
    "engineCoolantFilterDifferentialPressure" DOUBLE PRECISION,
    "engineCoolantLevel" DOUBLE PRECISION,
    "engineCoolantLevelLowLampData" INTEGER,
    "engineCoolantTemperature" INTEGER,
    "engineCoolantTemperatureHighLampData" INTEGER,
    "engineDieselParticulateFilterIntakePressure" DOUBLE PRECISION,
    "engineExhaustGasOxygenSensorClosedLoopOperationBank1" INTEGER,
    "engineExhaustGasOxygenSensorClosedLoopOperationBank2" INTEGER,
    "engineExhaustGasTemperature" DOUBLE PRECISION,
    "engineFuelDeliveryPressure" INTEGER,
    "engineFuelFilterDegradation" INTEGER,
    "engineFuelFilterRestrictedLampData" INTEGER,
    "engineFuelRate" DOUBLE PRECISION,
    "engineIntakeManifold1Pressure" INTEGER,
    "engineIntakeManifold1Temperature" INTEGER,
    "engineOilLevel" DOUBLE PRECISION,
    "engineOilPressure" DOUBLE PRECISION,
    "engineOilPressureLowLampData" INTEGER,
    "engineOilTemperature1" DOUBLE PRECISION,
    "engineOverrideControlMode" INTEGER,
    "enginePercentLoadAtCurrentSpeed" INTEGER,
    "engineProtectLampData" INTEGER,
    "engineRedStopLampData" INTEGER,
    "engineRequestedSpeedSpeedLimit" DOUBLE PRECISION,
    "engineRequestedSpeedControlConditions" INTEGER,
    "engineRequestedTorqueHighResolution" DOUBLE PRECISION,
    "engineRequestedTorqueTorqueLimit" INTEGER,
    "engineSpeed" DOUBLE PRECISION,
    "engineThrottleValve1Position" DOUBLE PRECISION,
    "engineTotalFuelUsed" DOUBLE PRECISION,
    "engineTotalHoursOfOperation" DOUBLE PRECISION,
    "engineTotalRevolutions" INTEGER,
    "engineTripFuel" DOUBLE PRECISION,
    "engineTurbochargerOilTemperature" DOUBLE PRECISION,
    "externalAccelerationDemand" INTEGER,
    "flashRedStopLamp" INTEGER,
    "failureModeIdentifier" INTEGER,
    "flashAmberWarningLamp" INTEGER,
    "flashMalfunctionIndicatorLamp" INTEGER,
    "flashProtectLamp" INTEGER,
    "fuelLevel1" DOUBLE PRECISION,
    "highResolutionEngineFuelRate" DOUBLE PRECISION,
    "hours" INTEGER,
    "hydraulicRetarderOilTemperature" INTEGER,
    "hydraulicRetarderPressure" INTEGER,
    "hydraulicTemperature" INTEGER,
    "keyswitchBatteryPotential" DOUBLE PRECISION,
    "latitude" DOUBLE PRECISION,
    "localHourOffset" INTEGER,
    "localMinuteOffset" INTEGER,
    "longTermFuelTrimBank1" DOUBLE PRECISION,
    "longTermFuelTrimBank2" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "malfunctionIndicatorLamp" INTEGER,
    "minutes" INTEGER,
    "month" INTEGER,
    "nameOfWorkingSetMember" INTEGER,
    "navigationBasedVehicleSpeed" DOUBLE PRECISION,
    "networkServiceStatus1" INTEGER,
    "numberOfMembersInWorkingSet" INTEGER,
    "occurrenceCount" INTEGER,
    "overrideControlModePriority" INTEGER,
    "parkBrakeReleaseInhibitRequest" INTEGER,
    "parkingBrakeSwitch" INTEGER,
    "pitch" DOUBLE PRECISION,
    "powerTakeoffOilTemperature" INTEGER,
    "powerTakeoffSpeed" DOUBLE PRECISION,
    "protectLamp" INTEGER,
    "redStopLamp" INTEGER,
    "relativeHumidity" DOUBLE PRECISION,
    "requestedPercentClutchSlip" DOUBLE PRECISION,
    "spnConversionMethod" INTEGER,
    "seconds" DOUBLE PRECISION,
    "serviceDelayCalendarTimeBased" INTEGER,
    "serviceDelayOperationalTimeBased" INTEGER,
    "serviceDistance" INTEGER,
    "shortTermFuelTrimBank1" DOUBLE PRECISION,
    "shortTermFuelTrimBank2" DOUBLE PRECISION,
    "specificHumidity" DOUBLE PRECISION,
    "suspectParameterNumber" INTEGER,
    "tsc1ControlPurpose" INTEGER,
    "tsc1TransmissionRate" INTEGER,
    "timeSinceLastService" INTEGER,
    "totalEcuRunTime" DOUBLE PRECISION,
    "totalPowerTakeoffHours" DOUBLE PRECISION,
    "transmissionCurrentGear" INTEGER,
    "transmissionCurrentRange" INTEGER,
    "transmissionGearShiftInhibitRequest" INTEGER,
    "transmissionOilTemperature" DOUBLE PRECISION,
    "transmissionOutputShaftSpeed" DOUBLE PRECISION,
    "transmissionReverseGearShiftInhibitRequest" INTEGER,
    "transmissionTorqueConverterLockupDisableRequest" INTEGER,
    "transmissionTorqueConverterLockupEngaged" INTEGER,
    "transmissionTorqueConverterLockupinProcess" INTEGER,
    "tripNumberOfHotShutdowns" INTEGER,
    "twoSpeedAxleSwitch" INTEGER,
    "valveAssemblyLoadSensePressure" INTEGER,
    "valveAssemblySupplyPressure" INTEGER,
    "valveLoadSensePressure" INTEGER,
    "valvePilotPressure" INTEGER,
    "vehicleBatteryVoltageLowLampData" INTEGER,
    "vehicleFuelLevelLowLampData" INTEGER,
    "vehicleIdentificationNumber" INTEGER,
    "waterInFuelIndicator" INTEGER,
    "wheelBasedVehicleSpeed" DOUBLE PRECISION,
    "wirelessSignalStrength1" DOUBLE PRECISION,
    "xbrControlMode" INTEGER,
    "xbrPriority" INTEGER,
    "xbrEbiMode" INTEGER,
    "year" INTEGER,
    "gpsLastModifiedOn" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "modifiedOn" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdOn" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "isWebSocketConnected" BOOLEAN NOT NULL DEFAULT false,
    "isSleeping" BOOLEAN NOT NULL DEFAULT false,
    "lastSensorUpdate" TEXT,
    "ts" TEXT,

    CONSTRAINT "DeviceTelemetry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProvisionedDevice" (
    "id" SERIAL NOT NULL,
    "boatId" INTEGER NOT NULL,
    "deviceId" INTEGER NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProvisionedDevice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DealersCircleComponent" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER,
    "supplierManufacturerPartId" INTEGER,
    "supplierManufacturerPartNumber" TEXT,
    "componentUnqiueIdentifier" TEXT,
    "oemUniqueIdentified" TEXT,
    "oemMake" TEXT,
    "oemModelYear" INTEGER,
    "oemModelName" TEXT,
    "deliveredDate" TIMESTAMP(3),
    "deliveryEntryDate" TIMESTAMP(3),
    "dealerName" TEXT,
    "salesPersonEmail" TEXT,
    "recievedOwnersManual" BOOLEAN,
    "understandResponsiblilityOwnersManual" BOOLEAN,
    "recievedWarrantyStatementAndAgree" BOOLEAN,
    "agreeToPrivacyPolicy" BOOLEAN,
    "consentToDataCollection" BOOLEAN,
    "customerId" INTEGER,
    "firstName" TEXT,
    "lastName" TEXT,
    "address1" TEXT,
    "address2" TEXT,
    "city" TEXT,
    "state" TEXT,
    "stateCode" TEXT,
    "postalCode" TEXT,
    "country" TEXT,
    "countryCode" TEXT,
    "homePhone" TEXT,
    "mobilePhone" TEXT,
    "email" TEXT,
    "individualOrCompany" BOOLEAN,

    CONSTRAINT "DealersCircleComponent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlarmLog" (
    "id" SERIAL NOT NULL,
    "boatId" INTEGER NOT NULL,
    "deviceId" INTEGER NOT NULL,
    "logId" INTEGER NOT NULL,
    "description" TEXT,
    "bus" INTEGER,
    "node" TEXT,
    "spn" INTEGER,
    "fmi" TEXT,
    "createdOn" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AlarmLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IgnitionOffLog" (
    "id" SERIAL NOT NULL,
    "boatId" INTEGER NOT NULL,
    "deviceId" INTEGER NOT NULL,
    "logId" INTEGER NOT NULL,
    "accelX" DOUBLE PRECISION,
    "accelXyzMagnitude" DOUBLE PRECISION,
    "accelY" DOUBLE PRECISION,
    "accelZ" DOUBLE PRECISION,
    "analogInput1" DOUBLE PRECISION,
    "analogInput2" DOUBLE PRECISION,
    "analogInput3" DOUBLE PRECISION,
    "analogInput4" DOUBLE PRECISION,
    "digitalInput1" INTEGER,
    "digitalInput2" INTEGER,
    "digitalInput3" INTEGER,
    "digitalInput4" INTEGER,
    "digitalOutput1" INTEGER,
    "digitalOutput2" INTEGER,
    "gpsAltitudeFt" INTEGER,
    "gpsAltitudeM" INTEGER,
    "gpsCourse" DOUBLE PRECISION,
    "gpsDate" DOUBLE PRECISION,
    "gpsLatitude" DOUBLE PRECISION,
    "gpsLongitude" DOUBLE PRECISION,
    "gpsMode" INTEGER,
    "gpsModeStr" TEXT,
    "gpsNumSatellites" INTEGER,
    "gpsSpeedKmh" DOUBLE PRECISION,
    "gpsSpeedMph" DOUBLE PRECISION,
    "gpsTime" INTEGER,
    "gpsUtc" BIGINT,
    "gpsUtcDays" INTEGER,
    "gpsUtcSec" INTEGER,
    "gpsUtcStr" TEXT,
    "gpsWarn" TEXT,
    "gsmAccessTechnology" TEXT,
    "gsmConnected" INTEGER,
    "gsmRegStatus" TEXT,
    "gsmSignalQualityBars" INTEGER,
    "gSMSignalQualityDbm" INTEGER,
    "gsmSignalQualityStr" TEXT,
    "gsmSimStatus" TEXT,
    "input1DutyCycle" INTEGER,
    "input1Frequency" DOUBLE PRECISION,
    "sysSerial" INTEGER,
    "sysType" TEXT,
    "sysVariant" INTEGER,
    "tempC" DOUBLE PRECISION,
    "tempF" DOUBLE PRECISION,
    "acceleratorPedalPosition1" DOUBLE PRECISION,
    "actualEnginePercentTorque" INTEGER,
    "actualEnginePercentTorqueHighResolution" DOUBLE PRECISION,
    "altitude" DOUBLE PRECISION,
    "amberWarningLamp" INTEGER,
    "ambientAirTemperature" DOUBLE PRECISION,
    "barometricAbsolutePressure" DOUBLE PRECISION,
    "barometricPressure" DOUBLE PRECISION,
    "batteryPotentialPowerInput" DOUBLE PRECISION,
    "brakeSwitch" INTEGER,
    "calculatedAmbientAirTemperature" DOUBLE PRECISION,
    "clutchSwitch" INTEGER,
    "compassBearing" DOUBLE PRECISION,
    "cruiseControlActive" INTEGER,
    "cruiseControlEnableSwitch" INTEGER,
    "cruiseControlPauseSwitch" INTEGER,
    "day" DOUBLE PRECISION,
    "disengageDrivelineRequest" INTEGER,
    "drivelineRetarderOverheatIndicator" INTEGER,
    "ecuSerialNumber" INTEGER,
    "engineActualIgnitionTiming" DOUBLE PRECISION,
    "engineAirFilter1DifferentialPressure" DOUBLE PRECISION,
    "engineAirFilterRestrictionLampData" INTEGER,
    "engineAirIntakePressure" INTEGER,
    "engineAirIntakeTemperature" INTEGER,
    "engineAmberWarningLampData" INTEGER,
    "engineCoolantFilterDifferentialPressure" DOUBLE PRECISION,
    "engineCoolantLevel" DOUBLE PRECISION,
    "engineCoolantLevelLowLampData" INTEGER,
    "engineCoolantTemperature" INTEGER,
    "engineCoolantTemperatureHighLampData" INTEGER,
    "engineDieselParticulateFilterIntakePressure" DOUBLE PRECISION,
    "engineExhaustGasOxygenSensorClosedLoopOperationBank1" INTEGER,
    "engineExhaustGasOxygenSensorClosedLoopOperationBank2" INTEGER,
    "engineExhaustGasTemperature" DOUBLE PRECISION,
    "engineFuelDeliveryPressure" INTEGER,
    "engineFuelFilterDegradation" INTEGER,
    "engineFuelFilterRestrictedLampData" INTEGER,
    "engineFuelRate" DOUBLE PRECISION,
    "engineIntakeManifold1Pressure" INTEGER,
    "engineIntakeManifold1Temperature" INTEGER,
    "engineOilLevel" DOUBLE PRECISION,
    "engineOilPressure" DOUBLE PRECISION,
    "engineOilPressureLowLampData" INTEGER,
    "engineOilTemperature1" DOUBLE PRECISION,
    "engineOverrideControlMode" INTEGER,
    "enginePercentLoadAtCurrentSpeed" INTEGER,
    "engineProtectLampData" INTEGER,
    "engineRedStopLampData" INTEGER,
    "engineRequestedSpeedSpeedLimit" DOUBLE PRECISION,
    "engineRequestedSpeedControlConditions" INTEGER,
    "engineRequestedTorqueHighResolution" DOUBLE PRECISION,
    "engineRequestedTorqueTorqueLimit" INTEGER,
    "engineSpeed" DOUBLE PRECISION,
    "engineThrottleValve1Position" DOUBLE PRECISION,
    "engineTotalFuelUsed" DOUBLE PRECISION,
    "engineTotalHoursOfOperation" DOUBLE PRECISION,
    "engineTotalRevolutions" INTEGER,
    "engineTripFuel" DOUBLE PRECISION,
    "engineTurbochargerOilTemperature" DOUBLE PRECISION,
    "externalAccelerationDemand" INTEGER,
    "flashRedStopLamp" INTEGER,
    "failureModeIdentifier" INTEGER,
    "flashAmberWarningLamp" INTEGER,
    "flashMalfunctionIndicatorLamp" INTEGER,
    "flashProtectLamp" INTEGER,
    "fuelLevel1" DOUBLE PRECISION,
    "highResolutionEngineFuelRate" DOUBLE PRECISION,
    "hours" INTEGER,
    "hydraulicRetarderOilTemperature" INTEGER,
    "hydraulicRetarderPressure" INTEGER,
    "hydraulicTemperature" INTEGER,
    "keyswitchBatteryPotential" DOUBLE PRECISION,
    "latitude" DOUBLE PRECISION,
    "localHourOffset" INTEGER,
    "localMinuteOffset" INTEGER,
    "longTermFuelTrimBank1" DOUBLE PRECISION,
    "longTermFuelTrimBank2" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "malfunctionIndicatorLamp" INTEGER,
    "minutes" INTEGER,
    "month" INTEGER,
    "nameOfWorkingSetMember" INTEGER,
    "navigationBasedVehicleSpeed" DOUBLE PRECISION,
    "networkServiceStatus1" INTEGER,
    "numberOfMembersInWorkingSet" INTEGER,
    "occurrenceCount" INTEGER,
    "overrideControlModePriority" INTEGER,
    "parkBrakeReleaseInhibitRequest" INTEGER,
    "parkingBrakeSwitch" INTEGER,
    "pitch" DOUBLE PRECISION,
    "powerTakeoffOilTemperature" INTEGER,
    "powerTakeoffSpeed" DOUBLE PRECISION,
    "protectLamp" INTEGER,
    "redStopLamp" INTEGER,
    "relativeHumidity" DOUBLE PRECISION,
    "requestedPercentClutchSlip" DOUBLE PRECISION,
    "spnConversionMethod" INTEGER,
    "seconds" DOUBLE PRECISION,
    "serviceDelayCalendarTimeBased" INTEGER,
    "serviceDelayOperationalTimeBased" INTEGER,
    "serviceDistance" INTEGER,
    "shortTermFuelTrimBank1" DOUBLE PRECISION,
    "shortTermFuelTrimBank2" DOUBLE PRECISION,
    "specificHumidity" DOUBLE PRECISION,
    "suspectParameterNumber" INTEGER,
    "tsc1ControlPurpose" INTEGER,
    "tsc1TransmissionRate" INTEGER,
    "timeSinceLastService" INTEGER,
    "totalEcuRunTime" DOUBLE PRECISION,
    "totalPowerTakeoffHours" DOUBLE PRECISION,
    "transmissionCurrentGear" INTEGER,
    "transmissionCurrentRange" INTEGER,
    "transmissionGearShiftInhibitRequest" INTEGER,
    "transmissionOilTemperature" DOUBLE PRECISION,
    "transmissionOutputShaftSpeed" DOUBLE PRECISION,
    "transmissionReverseGearShiftInhibitRequest" INTEGER,
    "transmissionTorqueConverterLockupDisableRequest" INTEGER,
    "transmissionTorqueConverterLockupEngaged" INTEGER,
    "transmissionTorqueConverterLockupinProcess" INTEGER,
    "tripNumberOfHotShutdowns" INTEGER,
    "twoSpeedAxleSwitch" INTEGER,
    "valveAssemblyLoadSensePressure" INTEGER,
    "valveAssemblySupplyPressure" INTEGER,
    "valveLoadSensePressure" INTEGER,
    "valvePilotPressure" INTEGER,
    "vehicleBatteryVoltageLowLampData" INTEGER,
    "vehicleFuelLevelLowLampData" INTEGER,
    "vehicleIdentificationNumber" INTEGER,
    "waterInFuelIndicator" INTEGER,
    "wheelBasedVehicleSpeed" DOUBLE PRECISION,
    "wirelessSignalStrength1" DOUBLE PRECISION,
    "xbrControlMode" INTEGER,
    "xbrPriority" INTEGER,
    "xbrEbiMode" INTEGER,
    "year" INTEGER,
    "createdOn" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IgnitionOffLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IgnitionOnLog" (
    "id" SERIAL NOT NULL,
    "boatId" INTEGER NOT NULL,
    "deviceId" INTEGER NOT NULL,
    "logId" INTEGER NOT NULL,
    "accelX" DOUBLE PRECISION,
    "accelXyzMagnitude" DOUBLE PRECISION,
    "accelY" DOUBLE PRECISION,
    "accelZ" DOUBLE PRECISION,
    "analogInput1" DOUBLE PRECISION,
    "analogInput2" DOUBLE PRECISION,
    "analogInput3" DOUBLE PRECISION,
    "analogInput4" DOUBLE PRECISION,
    "digitalInput1" INTEGER,
    "digitalInput2" INTEGER,
    "digitalInput3" INTEGER,
    "digitalInput4" INTEGER,
    "digitalOutput1" INTEGER,
    "digitalOutput2" INTEGER,
    "gpsAltitudeFt" INTEGER,
    "gpsAltitudeM" INTEGER,
    "gpsCourse" DOUBLE PRECISION,
    "gpsDate" DOUBLE PRECISION,
    "gpsLatitude" DOUBLE PRECISION,
    "gpsLongitude" DOUBLE PRECISION,
    "gpsMode" INTEGER,
    "gpsModeStr" TEXT,
    "gpsNumSatellites" INTEGER,
    "gpsSpeedKmh" DOUBLE PRECISION,
    "gpsSpeedMph" DOUBLE PRECISION,
    "gpsTime" INTEGER,
    "gpsUtc" BIGINT,
    "gpsUtcDays" INTEGER,
    "gpsUtcSec" INTEGER,
    "gpsUtcStr" TEXT,
    "gpsWarn" TEXT,
    "gsmAccessTechnology" TEXT,
    "gsmConnected" INTEGER,
    "gsmRegStatus" TEXT,
    "gsmSignalQualityBars" INTEGER,
    "gsmSignalQualityDBm" INTEGER,
    "gsmSignalQualityStr" TEXT,
    "gsmSimStatus" TEXT,
    "input1DutyCycle" INTEGER,
    "input1Frequency" DOUBLE PRECISION,
    "sysSerial" INTEGER,
    "sysType" TEXT,
    "sysVariant" INTEGER,
    "tempC" DOUBLE PRECISION,
    "tempF" DOUBLE PRECISION,
    "acceleratorPedalPosition1" DOUBLE PRECISION,
    "actualEnginePercentTorque" INTEGER,
    "actualEnginePercentTorqueHighResolution" DOUBLE PRECISION,
    "altitude" DOUBLE PRECISION,
    "amberWarningLamp" INTEGER,
    "ambientAirTemperature" DOUBLE PRECISION,
    "barometricAbsolutePressure" DOUBLE PRECISION,
    "barometricPressure" DOUBLE PRECISION,
    "batteryPotentialPowerInput" DOUBLE PRECISION,
    "brakeSwitch" INTEGER,
    "calculatedAmbientAirTemperature" DOUBLE PRECISION,
    "clutchSwitch" INTEGER,
    "compassBearing" DOUBLE PRECISION,
    "cruiseControlActive" INTEGER,
    "cruiseControlEnableSwitch" INTEGER,
    "cruiseControlPauseSwitch" INTEGER,
    "day" DOUBLE PRECISION,
    "disengageDrivelineRequest" INTEGER,
    "drivelineRetarderOverheatIndicator" INTEGER,
    "ecuSerialNumber" INTEGER,
    "engineActualIgnitionTiming" DOUBLE PRECISION,
    "engineAirFilter1DifferentialPressure" DOUBLE PRECISION,
    "engineAirFilterRestrictionLampData" INTEGER,
    "engineAirIntakePressure" INTEGER,
    "engineAirIntakeTemperature" INTEGER,
    "engineAmberWarningLampData" INTEGER,
    "engineCoolantFilterDifferentialPressure" DOUBLE PRECISION,
    "engineCoolantLevel" DOUBLE PRECISION,
    "engineCoolantLevelLowLampData" INTEGER,
    "engineCoolantTemperature" INTEGER,
    "engineCoolantTemperatureHighLampData" INTEGER,
    "engineDieselParticulateFilterIntakePressure" DOUBLE PRECISION,
    "engineExhaustGasOxygenSensorClosedLoopOperationBank1" INTEGER,
    "engineExhaustGasOxygenSensorClosedLoopOperationBank2" INTEGER,
    "engineExhaustGasTemperature" DOUBLE PRECISION,
    "engineFuelDeliveryPressure" INTEGER,
    "engineFuelFilterDegradation" INTEGER,
    "engineFuelFilterRestrictedLampData" INTEGER,
    "engineFuelRate" DOUBLE PRECISION,
    "engineIntakeManifold1Pressure" INTEGER,
    "engineIntakeManifold1Temperature" INTEGER,
    "engineOilLevel" DOUBLE PRECISION,
    "engineOilPressure" DOUBLE PRECISION,
    "engineOilPressureLowLampData" INTEGER,
    "engineOilTemperature1" DOUBLE PRECISION,
    "engineOverrideControlMode" INTEGER,
    "enginePercentLoadAtCurrentSpeed" INTEGER,
    "engineProtectLampData" INTEGER,
    "engineRedStopLampData" INTEGER,
    "engineRequestedSpeedSpeedLimit" DOUBLE PRECISION,
    "engineRequestedSpeedControlConditions" INTEGER,
    "engineRequestedTorqueHighResolution" DOUBLE PRECISION,
    "engineRequestedTorqueTorqueLimit" INTEGER,
    "engineSpeed" DOUBLE PRECISION,
    "engineThrottleValve1Position" DOUBLE PRECISION,
    "engineTotalFuelUsed" DOUBLE PRECISION,
    "engineTotalHoursOfOperation" DOUBLE PRECISION,
    "engineTotalRevolutions" INTEGER,
    "engineTripFuel" DOUBLE PRECISION,
    "engineTurbochargerOilTemperature" DOUBLE PRECISION,
    "externalAccelerationDemand" INTEGER,
    "flashRedStopLamp" INTEGER,
    "failureModeIdentifier" INTEGER,
    "flashAmberWarningLamp" INTEGER,
    "flashMalfunctionIndicatorLamp" INTEGER,
    "flashProtectLamp" INTEGER,
    "fuelLevel1" DOUBLE PRECISION,
    "highResolutionEngineFuelRate" DOUBLE PRECISION,
    "hours" INTEGER,
    "hydraulicRetarderOilTemperature" INTEGER,
    "hydraulicRetarderPressure" INTEGER,
    "hydraulicTemperature" INTEGER,
    "keyswitchBatteryPotential" DOUBLE PRECISION,
    "latitude" DOUBLE PRECISION,
    "localHourOffset" INTEGER,
    "localMinuteOffset" INTEGER,
    "longTermFuelTrimBank1" DOUBLE PRECISION,
    "longTermFuelTrimBank2" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "malfunctionIndicatorLamp" INTEGER,
    "minutes" INTEGER,
    "month" INTEGER,
    "nameOfWorkingSetMember" INTEGER,
    "navigationBasedVehicleSpeed" DOUBLE PRECISION,
    "networkServiceStatus1" INTEGER,
    "numberOfMembersInWorkingSet" INTEGER,
    "occurrenceCount" INTEGER,
    "overrideControlModePriority" INTEGER,
    "parkBrakeReleaseInhibitRequest" INTEGER,
    "parkingBrakeSwitch" INTEGER,
    "pitch" DOUBLE PRECISION,
    "powerTakeoffOilTemperature" INTEGER,
    "powerTakeoffSpeed" DOUBLE PRECISION,
    "protectLamp" INTEGER,
    "redStopLamp" INTEGER,
    "relativeHumidity" DOUBLE PRECISION,
    "requestedPercentClutchSlip" DOUBLE PRECISION,
    "spnConversionMethod" INTEGER,
    "seconds" DOUBLE PRECISION,
    "serviceDelayCalendarTimeBased" INTEGER,
    "serviceDelayOperationalTimeBased" INTEGER,
    "serviceDistance" INTEGER,
    "shortTermFuelTrimBank1" DOUBLE PRECISION,
    "shortTermFuelTrimBank2" DOUBLE PRECISION,
    "specificHumidity" DOUBLE PRECISION,
    "suspectParameterNumber" INTEGER,
    "tsc1ControlPurpose" INTEGER,
    "tsc1TransmissionRate" INTEGER,
    "timeSinceLastService" INTEGER,
    "totalEcuRunTime" DOUBLE PRECISION,
    "totalPowerTakeoffHours" DOUBLE PRECISION,
    "transmissionCurrentGear" INTEGER,
    "transmissionCurrentRange" INTEGER,
    "transmissionGearShiftInhibitRequest" INTEGER,
    "transmissionOilTemperature" DOUBLE PRECISION,
    "transmissionOutputShaftSpeed" DOUBLE PRECISION,
    "transmissionReverseGearShiftInhibitRequest" INTEGER,
    "transmissionTorqueConverterLockupDisableRequest" INTEGER,
    "transmissionTorqueConverterLockupEngaged" INTEGER,
    "transmissionTorqueConverterLockupinProcess" INTEGER,
    "tripNumberOfHotShutdowns" INTEGER,
    "twoSpeedAxleSwitch" INTEGER,
    "valveAssemblyLoadSensePressure" INTEGER,
    "valveAssemblySupplyPressure" INTEGER,
    "valveLoadSensePressure" INTEGER,
    "valvePilotPressure" INTEGER,
    "vehicleBatteryVoltageLowLampData" INTEGER,
    "vehicleFuelLevelLowLampData" INTEGER,
    "vehicleIdentificationNumber" INTEGER,
    "waterInFuelIndicator" INTEGER,
    "wheelBasedVehicleSpeed" DOUBLE PRECISION,
    "wirelessSignalStrength1" DOUBLE PRECISION,
    "xbrControlMode" INTEGER,
    "xbrPriority" INTEGER,
    "xbrEbiMode" INTEGER,
    "year" INTEGER,
    "createdOn" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IgnitionOnLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Log" (
    "id" SERIAL NOT NULL,
    "deviceId" INTEGER NOT NULL,
    "boatId" INTEGER NOT NULL,
    "log" TEXT NOT NULL,
    "extension" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "logStartedOn" TIMESTAMP(3) NOT NULL,
    "logEndedOn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SleepLog" (
    "id" SERIAL NOT NULL,
    "boatId" INTEGER NOT NULL,
    "deviceId" INTEGER NOT NULL,
    "logId" INTEGER NOT NULL,
    "accelX" DOUBLE PRECISION,
    "accelXyzMagnitude" DOUBLE PRECISION,
    "accelY" DOUBLE PRECISION,
    "accelZ" DOUBLE PRECISION,
    "analogInput1" DOUBLE PRECISION,
    "analogInput2" DOUBLE PRECISION,
    "analogInput3" DOUBLE PRECISION,
    "analogInput4" DOUBLE PRECISION,
    "digitalInput1" INTEGER,
    "digitalInput2" INTEGER,
    "digitalInput3" INTEGER,
    "digitalInput4" INTEGER,
    "digitalOutput1" INTEGER,
    "digitalOutput2" INTEGER,
    "gpsAltitudeFt" INTEGER,
    "gpsAltitudeM" INTEGER,
    "gpsCourse" DOUBLE PRECISION,
    "gpsDate" DOUBLE PRECISION,
    "gpsLatitude" DOUBLE PRECISION,
    "gpsLongitude" DOUBLE PRECISION,
    "gpsMode" INTEGER,
    "gpsModeStr" TEXT,
    "gpsNumSatellites" INTEGER,
    "gpsSpeedKmh" DOUBLE PRECISION,
    "gpsSpeedMph" DOUBLE PRECISION,
    "gpsTime" INTEGER,
    "gpsUtc" BIGINT,
    "gpsUtcDays" INTEGER,
    "gpsUtcSec" INTEGER,
    "gpsUtcStr" TEXT,
    "gpsWarn" TEXT,
    "gsmAccessTechnology" TEXT,
    "gsmConnected" INTEGER,
    "gsmRegStatus" TEXT,
    "gsmSignalQualityBars" INTEGER,
    "gsmSignalQualityDBm" INTEGER,
    "gsmSignalQualityStr" TEXT,
    "gsmSimStatus" TEXT,
    "input1DutyCycle" INTEGER,
    "input1Frequency" DOUBLE PRECISION,
    "sysSerial" BIGINT,
    "sysType" TEXT,
    "sysVariant" INTEGER,
    "tempC" DOUBLE PRECISION,
    "tempF" DOUBLE PRECISION,
    "createdOn" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SleepLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IX_Boat_dealershipId" ON "Boat"("dealershipId");

-- CreateIndex
CREATE UNIQUE INDEX "Device_serial_key" ON "Device"("serial");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_userId_roleId_key" ON "UserRole"("userId", "roleId");

-- CreateIndex
CREATE UNIQUE INDEX "UserToken_token_key" ON "UserToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "UserToken_userId_key" ON "UserToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_userId_key" ON "Admin"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Dealer_userId_key" ON "Dealer"("userId");

-- CreateIndex
CREATE INDEX "IX_Dealer_dealershipId" ON "Dealer"("dealershipId");

-- CreateIndex
CREATE UNIQUE INDEX "Guest_userId_key" ON "Guest"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_userId_key" ON "Owner"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "BoatAdmin_adminId_boatId_key" ON "BoatAdmin"("adminId", "boatId");

-- CreateIndex
CREATE UNIQUE INDEX "BoatGuest_guestId_boatId_key" ON "BoatGuest"("guestId", "boatId");

-- CreateIndex
CREATE UNIQUE INDEX "BoatOwner_boatId_key" ON "BoatOwner"("boatId");

-- CreateIndex
CREATE UNIQUE INDEX "DeviceTelemetry_deviceId_key" ON "DeviceTelemetry"("deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "ProvisionedDevice_boatId_key" ON "ProvisionedDevice"("boatId");

-- CreateIndex
CREATE UNIQUE INDEX "ProvisionedDevice_deviceId_key" ON "ProvisionedDevice"("deviceId");

-- CreateIndex
CREATE INDEX "IX_AlarmLogs_BoatId" ON "AlarmLog"("boatId");

-- CreateIndex
CREATE INDEX "IX_AlarmLogs_DeviceId" ON "AlarmLog"("deviceId");

-- CreateIndex
CREATE INDEX "IX_AlarmLogs_LogId" ON "AlarmLog"("logId");

-- CreateIndex
CREATE INDEX "IX_IgnitionOffLog_BoatId" ON "IgnitionOffLog"("boatId");

-- CreateIndex
CREATE INDEX "IX_IgnitionOffLog_DeviceId" ON "IgnitionOffLog"("deviceId");

-- CreateIndex
CREATE INDEX "IX_IgnitionOffLog_LogId" ON "IgnitionOffLog"("logId");

-- CreateIndex
CREATE INDEX "IX_IgnitonOnLog_BoatId" ON "IgnitionOnLog"("boatId");

-- CreateIndex
CREATE INDEX "IX_IgnitonOnLog_DeviceId" ON "IgnitionOnLog"("deviceId");

-- CreateIndex
CREATE INDEX "IX_IgnitonOnLog_LogId" ON "IgnitionOnLog"("logId");

-- CreateIndex
CREATE UNIQUE INDEX "Log_log_key" ON "Log"("log");

-- CreateIndex
CREATE INDEX "IX_Log_boatId" ON "Log"("boatId");

-- CreateIndex
CREATE INDEX "IX_Log_deviceId" ON "Log"("deviceId");

-- CreateIndex
CREATE INDEX "IX_SleepLogs_BoatId" ON "SleepLog"("boatId");

-- CreateIndex
CREATE INDEX "IX_SleepLogs_DeviceId" ON "SleepLog"("deviceId");

-- CreateIndex
CREATE INDEX "IX_SleepLogs_LogId" ON "SleepLog"("logId");

-- AddForeignKey
ALTER TABLE "Boat" ADD CONSTRAINT "Boat_dealershipId_fkey" FOREIGN KEY ("dealershipId") REFERENCES "Dealership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToken" ADD CONSTRAINT "UserToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dealer" ADD CONSTRAINT "Dealer_dealershipId_fkey" FOREIGN KEY ("dealershipId") REFERENCES "Dealership"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dealer" ADD CONSTRAINT "Dealer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guest" ADD CONSTRAINT "Guest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Owner" ADD CONSTRAINT "Owner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoatAdmin" ADD CONSTRAINT "BoatAdmin_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoatAdmin" ADD CONSTRAINT "BoatAdmin_boatId_fkey" FOREIGN KEY ("boatId") REFERENCES "Boat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoatGuest" ADD CONSTRAINT "BoatGuest_boatId_fkey" FOREIGN KEY ("boatId") REFERENCES "Boat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoatGuest" ADD CONSTRAINT "BoatGuest_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "Guest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoatOwner" ADD CONSTRAINT "BoatOwner_boatId_fkey" FOREIGN KEY ("boatId") REFERENCES "Boat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoatOwner" ADD CONSTRAINT "BoatOwner_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceTelemetry" ADD CONSTRAINT "DeviceTelemetry_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProvisionedDevice" ADD CONSTRAINT "ProvisionedDevice_boatId_fkey" FOREIGN KEY ("boatId") REFERENCES "Boat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProvisionedDevice" ADD CONSTRAINT "ProvisionedDevice_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlarmLog" ADD CONSTRAINT "AlarmLog_boatId_fkey" FOREIGN KEY ("boatId") REFERENCES "Boat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlarmLog" ADD CONSTRAINT "AlarmLog_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlarmLog" ADD CONSTRAINT "AlarmLog_logId_fkey" FOREIGN KEY ("logId") REFERENCES "Log"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IgnitionOffLog" ADD CONSTRAINT "IgnitionOffLog_boatId_fkey" FOREIGN KEY ("boatId") REFERENCES "Boat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IgnitionOffLog" ADD CONSTRAINT "IgnitionOffLog_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IgnitionOffLog" ADD CONSTRAINT "IgnitionOffLog_logId_fkey" FOREIGN KEY ("logId") REFERENCES "Log"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IgnitionOnLog" ADD CONSTRAINT "IgnitionOnLog_boatId_fkey" FOREIGN KEY ("boatId") REFERENCES "Boat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IgnitionOnLog" ADD CONSTRAINT "IgnitionOnLog_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IgnitionOnLog" ADD CONSTRAINT "IgnitionOnLog_logId_fkey" FOREIGN KEY ("logId") REFERENCES "Log"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_boatId_fkey" FOREIGN KEY ("boatId") REFERENCES "Boat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SleepLog" ADD CONSTRAINT "SleepLog_boatId_fkey" FOREIGN KEY ("boatId") REFERENCES "Boat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SleepLog" ADD CONSTRAINT "SleepLog_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SleepLog" ADD CONSTRAINT "SleepLog_logId_fkey" FOREIGN KEY ("logId") REFERENCES "Log"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
