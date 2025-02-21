import { toast } from "react-toastify";

export const alertErrorsFromObject = (errors) => {
  for (const field in errors) {
    errors[field].forEach((e) => {
      toast.error(e);
    });

    // toast.error(errors[field]);
  }
};
