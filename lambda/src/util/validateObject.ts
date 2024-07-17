type Validator<T> = {
  [K in keyof T]: {
    type: string;
    required: boolean;
  };
};

function validateObject<T>(obj: Partial<T>, validator: Validator<T>): string[] {
  const missingFields: string[] = [];

  for (const key in validator) {
    const validation = validator[key];

    if (validation.required && !(key in obj)) {
      missingFields.push(key);
    } else if (key in obj) {
      const value = obj[key as keyof T];
      if (typeof value !== validation.type) {
        missingFields.push(key);
      }
    }
  }

  return missingFields;
}
