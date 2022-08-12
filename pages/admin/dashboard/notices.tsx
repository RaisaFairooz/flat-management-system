import { useRouter } from "next/router";
import React from "react";

const Notices = () => {
  const router=useRouter();
  router.push("/admin")
  return <div>Notices</div>;
};

export default Notices;
