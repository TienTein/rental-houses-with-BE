import axios from "axios";
import React, { memo, useEffect, useRef, useState } from "react";

import cmtAva1 from "../../assets/images/demoAva.jpg";
import { baseURL } from "api/axios";

const Comment = ({ comment, setIsChange, setIsEdit, setValue }) => {
  const user = localStorage.getItem("user");
  const userData = JSON.parse(user);

  const [show, setShow] = useState(false);
  const [showControl, setShowControl] = useState(false);

  useEffect(() => {
    if (userData?.id == comment?.user?.id) {
      setShowControl(true);
    }
  }, []);

  const handleShow = () => {
    setShow(!show);
  };

  const deleteCommnet = async () => {
    try {
      await axios
        .delete(`${baseURL}/api/comments/${comment?.id}`, {
          headers: {
            Authorization: userData.access_token,
          },
        })
        .then((res) => {
          if (res?.data?.data?.message == "successful delete") {
            setIsChange(true);
          }
        });
    } catch (error) {}
  };

  const editCommnet = async () => {
    setIsEdit({
      check: true,
      comment: comment,
    });
    setShow(!show);
    setValue("comment", comment?.content);
  };
  // const ref = useRef();
  // console.log(ref.current);

  return (
    <>
      <div className=" m-8 flex w-full">
        <img src={cmtAva1} alt="" className="mr-4 h-[60px] w-[55px]" />
        <div className="cmt-item relative flex w-[90%] flex-col bg-white p-4">
          <h1 className="font-bold capitalize text-[#1359C1]">
            {comment?.user?.lastName + " " + comment?.user?.firstName}
          </h1>
          <div className="mx-auto mb-2 h-[1px] w-[100%] bg-black opacity-20"></div>
          <p className="text-sm opacity-90">{comment?.content}</p>
          <div className="absolute bottom-[-1.5rem] left-2 flex items-baseline text-[14px]">
            {/* <button className="mr-2">Reply</button> */}
            <button className="mr-2">Like</button>
            <button className="mr-2">Dislike</button>
            {showControl && (
              <div className="group-change-btn relative flex flex-col">
                <div
                  className={
                    show == true
                      ? "menu-change absolute -top-10 border-[1px] bg-white px-2 text-[13px]"
                      : "hidden"
                  }
                >
                  <button
                    className="opacity-75 hover:opacity-60"
                    onClick={deleteCommnet}
                  >
                    Xo??
                  </button>
                  <button
                    className="opacity-75 hover:opacity-60"
                    onClick={editCommnet}
                  >
                    S???a
                  </button>
                </div>
                <button
                  className="mr-2 text-[24px] font-bold"
                  onClick={handleShow}
                >
                  ...
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Comment);
