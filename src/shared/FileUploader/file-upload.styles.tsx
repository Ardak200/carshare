import styled from "styled-components";
import {FC} from "react";

export const FileUploadContainer = styled.section`
  position: relative;
  margin: 25px 0 15px;
  border: 2px dotted gray;
  padding: 35px 20px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  // background-color: ;
`;

export const DragDropImgIcon = styled.img`
   margin: auto;
   cursor:pointer;
   width:100%;
   height:3rem;
`;


export const FormField = styled.input`
  font-size: 18px;
  display: block;
  width: 100%;
  border: none;
  text-transform: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;

  &:focus {
    outline: none;
  }
`;

// export const InputLabel = styled.label`
//   top: -21px;
//   font-size: 13px;
//   color: black;
//   left: 0;
//   position: absolute;
// `;

export const DragDropText = styled.p`
  // font-weight: bold;
  font-size: 12px;
  letter-spacing: 1.2px;
  margin-top: 0;
  text-align: center;
`;

export const UploadFileBtn = styled.button`
  box-sizing: border-box;
  margin-top:16px;
  appearance: none;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.3rem;
  line-height: 1;
  padding: 0;
  text-align: center;
  font-weight: 500;
  color: #8F92A1;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: color 250ms ease-in-out;
  font-size:14px;
  display: flex;
  align-items: center;
  padding-right: 0;
  justify-content: center;
  
  &:after {
    content: "";
    position: absolute;
    display: block;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 100%;
    background: #3498db;
    z-index: -1;
    transition: width 250ms ease-in-out;
  }
  
  span b {
    color: #0052CC;
  }
  i {
    font-size: 22px;
    margin-right: 5px;
    border-right: 2px solid;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  @media only screen and (max-width: 500px) {
    width: 70%;
  }

  @media only screen and (max-width: 350px) {
    width: 100%;
  }

  &:disabled {
    opacity: 0.4;
    filter: grayscale(100%);
    pointer-events: none;
  }
`;



export const FilePreviewContainer = styled.article`
  margin-bottom: 35px;

  // span {
  //   font-size: 10px;
  // }
`;

export const PreviewList = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;

  // @media only screen and (max-width: 400px) {
  //   flex-direction: column;
  // }
  @media only screen and (max-width: 280px) {
    flex-direction: column;
  }
`;

export const FileMetaData = () => styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 5px;
  border-radius: 6px;
  font-size: 9px;
  color: white;
  font-weight: bold;
  background-color: rgba(5, 5, 5, 0.55);

  aside {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
  }
`;

export const RemoveFileIcon = styled.i`
  cursor: pointer;

  &:hover {
    transform: scale(1.3);
  }
`;

export const PreviewContainer = styled.section`
  padding: 0.25rem;
  width: 20%;
  height: 70px;
  // height: 100px;
  border-radius: 6px;
  box-sizing: border-box;

  &:hover {
    opacity: 0.55;
  }

  & > div:first-of-type {
    height: 100%;
    position: relative;
  }

  @media only screen and (max-width: 750px) {
    width: 25%;
  }

  @media only screen and (max-width: 500px) {
    // width: 50%;
    width: 25%;
  }

  @media only screen and (max-width: 400px) {
    width: 25%;
    padding: 0 0 0.4em;
  }

  @media only screen and (max-width: 280px) {
    width: 100%;
    padding: 0 0 0.4em;
  }
`;

export const ImagePreview = styled.img`
  border-radius: 6px;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
