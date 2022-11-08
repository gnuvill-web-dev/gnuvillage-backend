import { SetMetadata } from '@nestjs/common';
import { GuardType } from '../utils/enum';

export const GuardTypes = (...guardTypes: GuardType[]) =>
  SetMetadata('guardTypes', guardTypes);
