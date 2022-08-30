import { Stack } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/pro-solid-svg-icons";
import { FC } from "react";
import styles from "../styles/Components.module.scss";
export const RadiusInput: FC<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> = (props) => {
  return (
    <Stack id={styles.radiusInput} direction="row" alignItems="center">
      <FontAwesomeIcon icon={faSearch} />
      <input {...props} />
    </Stack>
  );
};
