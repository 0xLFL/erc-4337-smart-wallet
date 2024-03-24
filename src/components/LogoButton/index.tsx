import React from 'react';
import LogoAnimated from '../LogoAnimated';
import { Button } from "@radix-ui/themes";

const LogoButton = () => {
  return (
    <Button
      variant="soft"
      size={"3"}
      style={{
        width: "var(--base-button-height)",
        height: "var(--base-button-height)",
        padding: 0
      }}
    >
      <div style={{ width: "25px", height: "25px" }}>
        <LogoAnimated />
      </div>
    </Button>
  )
}

export default LogoButton;
