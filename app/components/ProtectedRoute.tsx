import React, { useEffect } from "react";
import Router from "next/router";

import { Spinner } from "@chakra-ui/react";
import { useAppSelector } from "store/hook";

interface ProtectedLayoutProps {
  children: React.ReactNode | React.ReactNode[];
}

function ProtectedRoute({ children }: ProtectedLayoutProps) {
  const { user, initialLoading } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (!initialLoading && !user) {
      Router.replace("/signin");
    }
  }, [user, initialLoading]);

  if (initialLoading) {
    return <Spinner />;
  }
  if (!initialLoading && user) {
    return <>{children}</>;
  }
  return null;
}

export default ProtectedRoute;
