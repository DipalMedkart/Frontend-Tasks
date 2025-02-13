import React from "react";
import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const BreadCrumbs = () => {
  const router = useRouter();
//   const pathnames = router.pathname.split("/").filter((x) => x);

  
const pathnames = router.pathname
.split("/")
.filter((x) => x && !x.startsWith("["));


  return (
    <div className="flex w-10/12 mx-auto px-0 p-2">

    <Breadcrumbs aria-label="breadcrumb" sx={{ padding: 0 }} separator={<NavigateNextIcon fontSize="small" />}>
      <Link href="/" passHref>
        <img src="/home.png" alt="Home" style={{ width: 30, height: 30 }} />
      </Link>
      {pathnames.map((value, index) => {
          const href = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          
          return isLast ? (
              <Typography key={href} sx={{ color: "text.primary", fontSize : "20px" }}>
            {value.replace(/-/g, " ")}
          </Typography>
        ) : (
            <Link key={href} href={href} passHref className="text-black">
            {value.replace(/-/g, " ")}
          </Link>
        );
    })}
    </Breadcrumbs>
    </div>
  );
};

export default BreadCrumbs;
