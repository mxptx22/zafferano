import React, { FunctionComponent } from "react";

// HERE Go Types

export type IBumperProps = {
  abortFunction: () => void;
};

export const LoadingBumper = ({ abortFunction }: IBumperProps) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8">
      <div className="text-8xl justify-center">Loading...</div>
      <button onClick={abortFunction} className="btn btn-accent">
        Cancel
      </button>
    </div>
  );
};

export const ErrorBumper = ({ abortFunction }: IBumperProps) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8">
      {/* That weird code's meant to say sad face emoji :( */}
      <div className="text-8xl justify-center">
        An Error Occurred &#58;&#40;
      </div>
      <button onClick={abortFunction} className="btn btn-accent">
        Cancel
      </button>
    </div>
  );
};

export const NOResultsBumper = ({ abortFunction }: IBumperProps) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8">
      {/* That weird code's meant to say sad face emoji :( */}
      <div className="text-8xl justify-center">Nothing Found &#58;&#40;</div>
      <button onClick={abortFunction} className="btn btn-accent">
        Cancel
      </button>
    </div>
  );
};
