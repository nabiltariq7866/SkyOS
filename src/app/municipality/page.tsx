"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MunicipalityRoot() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace("/municipality/dashboard");
  }, [router]);

  return null;
}
