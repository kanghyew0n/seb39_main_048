import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DaumPostcodeEmbed from "react-daum-postcode";
import usePost from "../../store/PostStore";

const AddressPost = () => {
  const { address, setAddress } = usePost();
  const [isOpen, setIsOpen] = useState(false);
  const [detailAddress, setDetailAddress] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setAddress(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

  return (
    <LocationInput>
      <div>주소 입력</div>
      <div className="LocationContainer">
        <div className="searchAddress">
          <input
            placeholder="주소를 검색해주세요"
            defaultValue={address}
            onClick={() => setIsOpen(true)}
          />
          {isOpen ? (
            <button onClick={handleClick}>닫기</button>
          ) : (
            <button onClick={handleClick}>주소 검색</button>
          )}
        </div>

        <input
          placeholder="상세 주소를 입력해주세요."
          onChange={(e) => setDetailAddress(e.target.value)}
        />
      </div>
      {isOpen ? (
        <DaumPostcodeEmbed
          style={{
            width: "350px",
            border: "1px solid #d7e2eb",
            marginTop: "16px",
          }}
          onComplete={handleComplete}
        />
      ) : (
        ""
      )}
    </LocationInput>
  );
};

const LocationInput = styled.div`
  color: #333333;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 128px;

  .LocationContainer {
    background-color: #f5f5f5;
    border: 1px solid;
    border-color: #d7e2eb;
    border-radius: 10px;
    margin-top: 24px;
    padding: 30px;
    width: 60%;
    gap: 30px;

    input {
      font-size: 12px;
      border: 1px solid;
      border-color: #d7e2eb;
      border-radius: 10px;
      height: 100%;
      width: 100%;
      padding: 12px;
    }
    button {
      color: #ffffff;
      font-size: 12px;
      font-weight: 500;
      background-color: #ffb653;
      border: 1px solid transparent;
      border-radius: 10px;
      height: 100%;
      width: 20%;
      padding: 10px;
      cursor: pointer;
    }
  }

  .searchAddress {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    margin-bottom: 10px;
  }
`;

export default AddressPost;
