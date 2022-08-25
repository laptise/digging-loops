import { FC } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "next/link";

function a11yProps(index: number) {
  return {
    id: `main-tab-${index}`,
    "aria-controls": `main-tabpanel-${index}`,
  };
}

export const TopTabs: FC<{ value: number }> = ({ value }) => {
  return (
    <Tabs value={value} aria-label="basic tabs example">
      <Link href="/" passHref={true}>
        <Tab label="ALL" {...a11yProps(0)} />
      </Link>
      <Link href="/samples" passHref={true}>
        <Tab label="Samples" {...a11yProps(1)} />
      </Link>
      <Link href="/presets" passHref={true}>
        <Tab label="Presets" {...a11yProps(2)} />
      </Link>
      <Link href="/packs" passHref={true}>
        <Tab label="Packs" {...a11yProps(3)} />
      </Link>
    </Tabs>
  );
};
