import "./index.scss";
import React, { useState } from "react";
// import NavbarLayout from "src/layouts/NavbarLayout";
import { useUserStore } from "src/state/User";
import DashTitle from "src/components/DashTitle";
import DashButton from "src/components/DashButton";
import { useNavigate } from "react-router-dom";
import DashInput from "src/components/DashInput";
import DashUploader from "src/components/DashUploader";

const Registration = () => {
  const navigate = useNavigate();
  const [phnoValidState, setPhnoValidState] = useState<string | null>(null);
  const [phno, setphno] = useState("");
  const [isCusatian, setIsCusatian] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [file, setFile] = useState<any>(null);
  const [
    { isNewUser, isAuthenticating, updatingPhno },
    { handleGoogleSignin, handleMoreInfo },
  ] = useUserStore();

  const validatePhno = (phno: string) => {
    const phnoRegex = new RegExp("[6-9]{1}[0-9]{9}");
    if (phno.length > 10) {
      setPhnoValidState("Maximum 10 characters");
    } else if (phnoRegex.test(phno)) {
      setPhnoValidState("");
    } else {
      setPhnoValidState("Please enter a valid phone number");
    }
  };

  return (
    <div className="dashLayout">
      <DashTitle title="Registration" />
      {isNewUser ? (
        <div>
          <DashInput
            name="phno"
            label="Phone Number"
            placeholder="Enter your phone number"
            errMsg={phnoValidState ?? ""}
            state={phnoValidState ? "error" : "success"}
            onChange={(val) => {
              setphno(val);
              validatePhno(val);
            }}
          />
          <label className="dashCheck">
            <input
              type="checkbox"
              checked={isVegetarian}
              onChange={() => setIsVegetarian((prev) => !prev)}
            />
            <span className="dashCheckMark"></span>
            <p>Are you a vegetarian?</p>
          </label>
          <label className="dashCheck">
            <input
              type="checkbox"
              checked={isCusatian}
              onChange={() => setIsCusatian((prev) => !prev)}
            />
            <span className="dashCheckMark"></span>
            <p>Are you a CUSATian?</p>
          </label>

          <DashUploader
            text="Upload CUSAT ID"
            visible={isCusatian}
            file={file}
            setFile={setFile}
          />

          <DashButton
            onClick={() =>
              handleMoreInfo(phno, isCusatian, isVegetarian, file, navigate)
            }
            disabled={(!file && isCusatian) || phnoValidState !== ""}
            loading={updatingPhno}
          >
            Register
          </DashButton>
        </div>
      ) : (
        <DashButton
          loading={isAuthenticating}
          onClick={() => handleGoogleSignin(navigate)}
        >
          Register with Google
        </DashButton>
      )}
    </div>
  );
};

export default Registration;
