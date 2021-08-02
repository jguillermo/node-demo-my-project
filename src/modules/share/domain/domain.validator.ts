import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class DomainValidator implements ValidatorConstraintInterface {
  validate(value: any, args?: ValidationArguments): Promise<boolean> | boolean {
    try {
      const vo = new args.constraints[0](value);
      return vo.isValid();
    } catch (e) {
      return false;
    }
  }

  defaultMessage(args?: ValidationArguments): string {
    try {
      const vo = new args.constraints[0](args.value);
      vo.isValid();
      return vo.validatorMessage();
    } catch (e) {
      return e.toString();
    }
  }
}
