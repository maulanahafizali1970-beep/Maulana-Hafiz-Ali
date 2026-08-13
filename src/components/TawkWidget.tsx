"use client";

import { usePathname } from "next/navigation";

export default function TawkWidget() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <script
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: `
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/6a7df6502850431d47cd920a/1jvu0kb3s';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
`,
      }}
    />
  );
}