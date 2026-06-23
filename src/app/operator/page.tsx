"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OperatorRoot() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace("/operator/dashboard");
  }, [router]);

  return null;
}
