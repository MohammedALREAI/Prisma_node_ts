import { unzip } from 'zlib';
import Joi from 'joi';

const deviceTelemetrySchema = {
  accelX: Joi.number(),
  accelXyzMagnitude: Joi.number(),
  accelY: Joi.number(),
  accelZ: Joi.number(),
  analogInput1: Joi.number(),
  analogInput2: Joi.number(),
  analogInput3: Joi.number(),
  analogInput4: Joi.number(),
  digitalInput1: Joi.number(),
  digitalInput2: Joi.number(),
  digitalInput3: Joi.number(),
  digitalInput4: Joi.number(),
  digitalOutput1: Joi.number(),
  digitalOutput2: Joi.number(),
  gpsAltitudeFt: Joi.number(),
  gpsAltitudeM: Joi.number(),
  gpsCourse: Joi.number(),
  gpsDate: Joi.number(),
  gpsLatitude: Joi.number(),
  gpsLongitude: Joi.number(),
  gpsMode: Joi.number(),
  gpsModeStr: Joi.string(),
  gpsNumSatellites: Joi.number(),
  gpsSpeedKmh: Joi.number(),
  gpsSpeedMph: Joi.number(),
  gpsTime: Joi.number(),
  gpsUtc: Joi.number(),
  gpsUtcDays: Joi.number(),
  gpsUtcSec: Joi.number(),
  gpsUtcStr: Joi.string(),
  gpsWarn: Joi.string(),
  gsmAccessTechnology: Joi.string(),
  gsmConnected: Joi.number(),
  gsmRegStatus: Joi.string(),
  gsmSignalQualityBars: Joi.number(),
  gsmSignalQualityDBm: Joi.number(),
  gsmSignalQualityStr: Joi.string(),
  gsmSimStatus: Joi.string(),
  input1DutyCycle: Joi.number(),
  input1Frequency: Joi.number(),
  sysSerial: Joi.number(),
  sysType: Joi.string(),
  sysVariant: Joi.number(),
  tempC: Joi.number(),
  tempF: Joi.number(),
  acceleratorPedalPosition1: Joi.number(),
  actualEnginePercentTorque: Joi.number(),
  actualEnginePercentTorqueHighResolution: Joi.number(),
  altitude: Joi.number(),
  amberWarningLamp: Joi.number(),
  ambientAirTemperature: Joi.number(),
  barometricAbsolutePressure: Joi.number(),
  barometricPressure: Joi.number(),
  batteryPotentialPowerInput: Joi.number(),
  brakeSwitch: Joi.number(),
  calculatedAmbientAirTemperature: Joi.number(),
  clutchSwitch: Joi.number(),
  compassBearing: Joi.number(),
  cruiseControlActive: Joi.number(),
  cruiseControlEnableSwitch: Joi.number(),
  cruiseControlPauseSwitch: Joi.number(),
  day: Joi.number(),
  disengageDrivelineRequest: Joi.number(),
  drivelineRetarderOverheatIndicator: Joi.number(),
  ecuSerialNumber: Joi.number(),
  engineActualIgnitionTiming: Joi.number(),
  engineAirFilterRestrictionLampData: Joi.number(),
  engineAirIntakePressure: Joi.number(),
  engineAirIntakeTemperature: Joi.number(),
  engineAmberWarningLampData: Joi.number(),
  engineCoolantFilterDifferentialPressure: Joi.number(),
  engineCoolantLevel: Joi.number(),
  engineCoolantLevelLowLampData: Joi.number(),
  engineCoolantTemperature: Joi.number(),
  engineCoolantTemperatureHighLampData: Joi.number(),
  engineDieselParticulateFilterIntakePressure: Joi.number(),
  engineExhaustGasOxygenSensorClosedLoopOperationBank1: Joi.number(),
  engineExhaustGasOxygenSensorClosedLoopOperationBank2: Joi.number(),
  engineExhaustGasTemperature: Joi.number(),
  engineFuelDeliveryPressure: Joi.number(),
  engineFuelFilterDegradation: Joi.number(),
  engineFuelFilterRestrictedLampData: Joi.number(),
  engineFuelRate: Joi.number(),
  engineIntakeManifold1Pressure: Joi.number(),
  engineIntakeManifold1Temperature: Joi.number(),
  engineOilLevel: Joi.number(),
  engineOilPressure: Joi.number(),
  engineOverrideControlMode: Joi.number(),
  enginePercentLoadAtCurrentSpeed: Joi.number(),
  engineProtectLampData: Joi.number(),
  engineRedStopLampData: Joi.number(),
  engineRequestedSpeedSpeedLimit: Joi.number(),
  engineRequestedSpeedControlConditions: Joi.number(),
  engineRequestedTorqueHighResolution: Joi.number(),
  engineRequestedTorqueTorqueLimit: Joi.number(),
  engineSpeed: Joi.number(),
  engineThrottleValve1Position: Joi.number(),
  engineTotalFuelUsed: Joi.number(),
  engineTotalHoursOfOperation: Joi.number(),
  engineTotalRevolutions: Joi.number(),
  engineTripFuel: Joi.number(),
  engineTurbochargerOilTemperature: Joi.number(),
  externalAccelerationDemand: Joi.number(),
  flashRedStopLamp: Joi.number(),
  failureModelIdentifier: Joi.number(),
  flashAmberWarningLamp: Joi.number(),
  flashMalfunctionIndicatorLamp: Joi.number(),
  flashProtectLamp: Joi.number(),
  fuelLevel1: Joi.number(),
  highResolutionEngineFuelRate: Joi.number(),
  hours: Joi.number(),
  hydraulicRetarderOilTemperature: Joi.number(),
  hydraulicTemperature: Joi.number(),
  hydraulicRetarderPressure: Joi.number(),
  keyswitchBatteryPotential: Joi.number(),
  latitude: Joi.number(),
  localHourOffset: Joi.number(),
  localMinuteOffset: Joi.number(),
  longTermFuelTrimBank1: Joi.number(),
  longTermFuelTrimBank2: Joi.number(),
  longitude: Joi.number(),
  malfunctionIndicatorLamp: Joi.number(),
  minutes: Joi.number(),
  month: Joi.number(),
  nameOfWorkingSetMember: Joi.number(),
  navigationBasedVehicleSpeed: Joi.number(),
  networkServiceStatus1: Joi.number(),
  numberOfMembersInWorkingSet: Joi.number(),
  occurrenceCount: Joi.number(),
  overrideControlModePriority: Joi.number(),
  parkBrakeReleaseInhibitRequest: Joi.number(),
  parkingBrakeSwitch: Joi.number(),
  pitch: Joi.number(),
  powerTakeoffOilTemperature: Joi.number(),
  powerTakeoffSpeed: Joi.number(),
  protectLamp: Joi.number(),
  redStopLamp: Joi.number(),
  relativeHumidity: Joi.number(),
  requestedPercentClutchSlip: Joi.number(),
  spnConversionMethod: Joi.number(),
  seconds: Joi.number(),
  serviceDelayCalendarTimeBased: Joi.number(),
  serviceDelayOperationalTimeBased: Joi.number(),
  serviceDistance: Joi.number(),
  shortTermFuelTrimBank1: Joi.number(),
  shortTermFuelTrimBank2: Joi.number(),
  specificHumidity: Joi.number(),
  suspectParameterNumber: Joi.number(),
  tsc1ControlPurpose: Joi.number(),
  tsc1TransmissionRate: Joi.number(),
  timeSinceLastService: Joi.number(),
  totalEcuRunTime: Joi.number(),
  totalPowerTakeoffHours: Joi.number(),
  transmissionCurrentGear: Joi.number(),
  transmissionCurrentRange: Joi.number(),
  transmissionGearShiftInhibitRequest: Joi.number(),
  transmissionOilTemperature: Joi.number(),
  transmissionOutputShaftSpeed: Joi.number(),
  transmissionReverseGearShiftInhibitRequest: Joi.number(),
  transmissionTorqueConverterLockupDisableRequest: Joi.number(),
  transmissionTorqueConverterLockupEngaged: Joi.number(),
  transmissionTorqueConverterLockupinProcess: Joi.number(),
  tripNumberOfHotShutdowns: Joi.number(),
  twoSpeedAxleSwitch: Joi.number(),
  valveAssemblyLoadSensePressure: Joi.number(),
  valveAssemblySupplyPressure: Joi.number(),
  valveLoadSensePressure: Joi.number(),
  valvePilotPressure: Joi.number(),
  vehicleBatteryVoltageLowLampData: Joi.number(),
  vehicleFuelLevelLowLampData: Joi.number(),
  vehicleIdentificationNumber: Joi.number(),
  waterInFuelIndicator: Joi.number(),
  wheelBasedVehicleSpeed: Joi.number(),
  wirelessSignalStrength1: Joi.number(),
  xbrControlMode: Joi.number(),
  xbrPriority: Joi.number(),
  xbrEbiMode: Joi.number(),
  year: Joi.number(),
  gpsLastModifiedOn: Joi.number(),
  isWebSocketConnected: Joi.boolean(),
  isSleeping: Joi.boolean(),
  lastSensorUpdate: Joi.string(),
  ts: Joi.string()
};

const unzipBuffer = (buf: Buffer): Promise<Record<string, unknown>> => {
  return new Promise((resolve, reject) => {
    unzip(buf, (e, res) => {
      if (e) {
        reject(e);
      }

      const bufString = res.toString();

      const result = JSON.parse(bufString);

      resolve(result);
    });
  });
};

const removeJ19Prefixes = (
  telemetry: Record<string, unknown>
): Record<string, unknown> => {
  /**
   * Shallow clone
   */
  const clone = { ...telemetry };

  Object.keys(telemetry).forEach(key => {
    if (key.includes('-')) {
      const keyArr = key.split('-');

      const [prefix, root] = keyArr;

      clone[root] = clone[key];

      delete clone[key];
    }
  });

  return clone;
};

const appendTimestamps = (
  telemetry: Record<string, unknown>
): Record<string, unknown> => {
  /**
   * Shallow clone
   */
  const clone = Object.assign({}, telemetry);

  if (telemetry.GPS_Mode === '0') {
    delete clone.ts;
  }

  clone.lastSensorUpdate = Date.now();

  return clone;
};

const checkIfGpsIsValid = (telemetry: Record<string, unknown>): boolean => {
  if (telemetry.GPS_Mode === '0') {
    return false;
  }
  return true;
};

const removeInvalidGpsParams = (telemetry: any): Record<string, unknown> => {
  const clone = Object.assign({}, telemetry);

  delete clone['GPS_Latitude'];
  delete clone['GPS_Longitude'];

  return clone;
};

const reformatObjectForSQLUpdate = (
  telemetry: Record<string, unknown>
): Record<string, unknown> => {
  const clone = { ...telemetry };
  console.log('clone');
  console.log(clone);

  const res = {};

  const tableSchema = Joi.object(deviceTelemetrySchema as any);

  for (const [k, v] of Object.entries(clone)) {
    let finalKey = k;

    if (k.includes('_')) {
      const keyArr = k.split('_');
      keyArr[0] = keyArr[0].toLowerCase();
      const lastIndex = keyArr[keyArr.length - 1];
      const lastIndexsFirstCharCapitalized = lastIndex.charAt(0).toUpperCase();

      keyArr[keyArr.length - 1] =
        lastIndexsFirstCharCapitalized + lastIndex.slice(1);
      finalKey = keyArr.join('');
    }
    if (finalKey === 'accelXYZMagnitude') {
      finalKey = 'accelXyzMagnitude';
    }

    const lowerCaseFirstLetter = finalKey.charAt(0);
    const keyWithoutFirstLetter = finalKey.slice(1);
    finalKey = lowerCaseFirstLetter.toLowerCase() + keyWithoutFirstLetter;
    res[finalKey] = v;

    console.log({ [finalKey]: v });
    const propValidation = tableSchema.validate({
      [finalKey]: v
    });
    res[finalKey] = propValidation.value[finalKey];
    if (
      propValidation.error &&
      JSON.stringify(propValidation.error).includes('string')
    ) {
      res[finalKey] = Number(v).toString();
    }
    if (
      propValidation.error &&
      JSON.stringify(propValidation.error).includes('number')
    ) {
      res[finalKey] = Number(v);
    }
  }

  return res;
};

const modifyDate = (date: string): number => {
  if (date.length > 8) {
    throw new Error('Invalid date format.');
  }
  const year = date.substring(0, 4);
  const month = date.substring(4, 6);
  const day = date.substring(6, 8);

  const result = `${year}-${month}-${day}`;

  return new Date(result).getTime();
};

export const checkIfLincIsUpdated = (date: string): boolean => {
  const epochLincDateCutOff = modifyDate('20201006');

  const epochLincDate = modifyDate(date);

  if (epochLincDate >= epochLincDateCutOff) {
    return true;
  }

  return false;
};

const sanitizer = async (buf: Buffer): Promise<Record<string, unknown>> => {
  try {
    let res: Record<string, unknown>;

    res = await unzipBuffer(buf);

    res = removeJ19Prefixes(res);

    res = appendTimestamps(res);

    if (!checkIfGpsIsValid(res)) {
      res = removeInvalidGpsParams(res);
    }

    res = reformatObjectForSQLUpdate(res);

    console.log(res);
    return res;
  } catch (e) {
    throw e;
  }
};

export default sanitizer;
