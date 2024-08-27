import { useCallback, useEffect, useRef, useState } from "react";

export default function OTPInput({ setOtpCode }: { setOtpCode: Function }) {
  const oneRef = useRef() as any;
  const twoRef = useRef() as any;
  const threeRef = useRef() as any;
  const fourRef = useRef() as any;
  const fiveRef = useRef() as any;

  const [one, setOne] = useState("");
  const [two, setTwo] = useState("");
  const [three, setThree] = useState("");
  const [four, setFour] = useState("");
  const [five, setFive] = useState("");

  const handleOtpInput = useCallback((e: any) => {
    const currentId = e.target.id;
    if (e.target.value) {
      if (currentId === "one") {
        twoRef.current.focus();
      } else if (currentId === "two") {
        threeRef.current.focus();
      } else if (currentId === "three") {
        fourRef.current.focus();
      } else if (currentId === "four") {
        fiveRef.current.focus();
      } else if (currentId === "five") {
        fiveRef.current.focus();
      } else {
        oneRef.current.focus();
      }
    } else {
      if (currentId === "two") {
        oneRef.current.focus();
      } else if (currentId === "three") {
        twoRef.current.focus();
      } else if (currentId === "four") {
        threeRef.current.focus();
      } else if (currentId === "five") {
        fourRef.current.focus();
      } else {
        oneRef.current.focus();
      }
    }
  }, []);

  useEffect(() => {
    oneRef.current.focus();
  }, []);

  useEffect(() => {
    const finalCode = `${one}${two}${three}${four}${five}`;
    setOtpCode(finalCode);
  }, [one, two, three, four, five]);

  return (
    <div className=" w-full flex items-center gap-3">
      {[
        { state: one, setState: setOne, id: "one", ref: oneRef },
        { state: two, setState: setTwo, id: "two", ref: twoRef },
        { state: three, setState: setThree, id: "three", ref: threeRef },
        { state: four, setState: setFour, id: "four", ref: fourRef },
        { state: five, setState: setFive, id: "five", ref: fiveRef },
      ].map((val) => {
        return (
          <input
            key={val?.id}
            title={val?.id}
            ref={val?.ref}
            autoFocus={val?.id === "one" ? true : false}
            type="text"
            id={val?.id}
            value={val?.state}
            max={1}
            maxLength={1}
            onChange={(e) => {
              val?.setState(e.target.value);
              handleOtpInput(e);
            }}
            required
            className="block w-full p-3 text-2xl text-gray-900 border-b border-primary bg-gray-50 focus:ring-[#17594F] focus:border-[#17594F]"
          />
        );
      })}
    </div>
  );
}
