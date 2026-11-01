import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { TextField, TextFieldProps } from "./TextField";

type FormFieldProps<T extends FieldValues> = Omit<
  TextFieldProps,
  "value" | "onChangeText" | "onBlur" | "error"
> & {
  control: Control<T>;
  name: FieldPath<T>;
};

export const FormField = <T extends FieldValues>({
  control,
  name,
  ...fieldProps
}: FormFieldProps<T>) => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => (
      <TextField
        {...fieldProps}
        inputRef={field.ref}
        value={field.value ?? ""}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        error={fieldState.error?.message}
      />
    )}
  />
);
