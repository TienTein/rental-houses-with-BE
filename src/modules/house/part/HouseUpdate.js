import React, { useEffect, useMemo, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

import { useSearchParams } from "react-router-dom";
import FormRow from "../../../components/common/FormRow";
import FormGroup from "../../../components/common/FormGroup";
import Dropdown from "../../../components/dropdown/Dropdown";
import { Label } from "../../../components/label";
import ImageUpload from "../../../components/Image/ImageUpload";
import FormThreeCol from "../../../components/common/FormThreeCol";
import Button from "../../../components/button/Button";
import { Input, Textarea } from "../../../components/input";
import { baseURL } from "../../../api/axios";
import { imgbbAPI } from "../../../config/config";
import Select from "../../../components/dropdown/Select";
import List from "../../../components/dropdown/List";
import Option from "../../../components/dropdown/Option";
import { Field } from "components/field";
import { Toggle } from "components/checkbox";

Quill.register("modules/imageUploader", ImageUploader);

const HouseUpdate = () => {
  const [params] = useSearchParams();
  const houseId = params.get("id");
  const { handleSubmit, control, setValue, reset, watch, getValues } = useForm({
    mode: "onChange",
    defaultValues: {
      detailSumary: "xzxczxc",
    },
  });
  const getDropdownLabel = (name) => {
    const value = watch(name);
    return value;
  };

  const [categoriesData, setCategoriesData] = useState([]);
  const [description, setDescription] = useState(false);
  const [house, setHouse] = useState("");
  const watchHot = watch("hot");

  const [selectCategory, setSelectCategory] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  useEffect(() => {
    async function fetchData() {
      await axios({
        method: "get",
        url: `${baseURL}/api/houses/${houseId}`,
      })
        .then(function (response) {
          console.log(response?.data?.data);
          setHouse(response?.data?.data);
        })
        .catch(function (response) {});
    }
    fetchData();
  }, [houseId, reset]);
  useEffect(() => {
    reset({
      ...house,
    });
  }, [house, reset]);
  const handleSelectCategories = (value, value1) => {
    setValue("typeIds", value);
    setValue("nameCategories", value1);
    setSelectCategory();
  };
  const handleSelectAddress = (name1, name2, value1, value2) => {
    setValue(name1, value1);
    setValue(name2, value2);
  };
  console.log(getValues("typeIds"));

  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
      imageUploader: {
        upload: async (file) => {
          const bodyFormData = new FormData();
          bodyFormData.append("image", file);
          const response = await axios({
            method: "post",
            url: imgbbAPI,
            data: bodyFormData,
            headers: {
              "content-Type": "multipart/form-data",
            },
          });
          return response.data.data.url;
        },
      },
    }),
    []
  );
  // //const [addressFilter, handleOnChangeValue] = useOnChange();
  // const HOST = "https://provinces.open-api.vn/api/";
  // const getProvince = getValues("provinceCode");
  // const getDistrict = getValues("districtCode");
  // // //get province
  // useEffect(() => {
  //   async function fetchProvinces() {
  //     try {
  //       const response = await axios.get(`${HOST}`);
  //       setProvinces(response.data);
  //     } catch (error) {
  //       toast.error(error.message);
  //     }
  //   }
  //   fetchProvinces();
  // }, []);
  // //get districts
  // useEffect(() => {
  //   async function fetchDistricts() {
  //     try {
  //       if (getProvince) {
  //         const response = await axios.get(`${HOST}p/${getProvince}?depth=2`);
  //         setDistricts(response.data.districts);
  //       }
  //     } catch (error) {
  //       toast.error(error.message);
  //     }
  //   }
  //   fetchDistricts();
  // }, [getProvince]);
  // useEffect(() => {
  //   async function fetchWards() {
  //     try {
  //       if (getDistrict) {
  //         const response = await axios.get(`${HOST}d/${getDistrict}?depth=2`);
  //         setWards(response.data.wards);
  //       }
  //     } catch (error) {
  //       toast.error(error.message);
  //     }
  //   }
  //   fetchWards();
  // }, [getDistrict]);

  const [preViewImage, setPreViewImage] = useState("");
  const [preViewImage1, setPreViewImage1] = useState("");
  const [preViewImage3, setPreViewImage3] = useState("");
  const [preViewImage4, setPreViewImage4] = useState("");
  const [preViewImage5, setPreViewImage5] = useState("");

  const handleChange = (e) => {
    const imageUpload = e.target.files[0];
    imageUpload.preview = URL.createObjectURL(imageUpload);
    setPreViewImage(imageUpload);
  };
  const handleChange1 = (e) => {
    const imageUpload = e.target.files[0];
    imageUpload.preview = URL.createObjectURL(imageUpload);
    setPreViewImage1(imageUpload);
  };
  const handleChange3 = (e) => {
    const imageUpload = e.target.files[0];
    imageUpload.preview = URL.createObjectURL(imageUpload);
    setPreViewImage3(imageUpload);
  };
  const handleChange4 = (e) => {
    const imageUpload = e.target.files[0];
    imageUpload.preview = URL.createObjectURL(imageUpload);
    setPreViewImage4(imageUpload);
  };
  const handleChange5 = (e) => {
    const imageUpload = e.target.files[0];
    imageUpload.preview = URL.createObjectURL(imageUpload);
    setPreViewImage5(imageUpload);
  };
  const user = localStorage.getItem("user");
  const userData = JSON.parse(user);
  const handleUpdateHouse = async (values) => {
    const cloneValues = { ...values };
    console.log(cloneValues);
    const price = Number(cloneValues?.price);

    const formData = new FormData();

    formData.append("image", preViewImage);
    formData.append("image2", preViewImage1);
    formData.append("image3", preViewImage3);
    formData.append("image4", preViewImage4);
    formData.append("image5", preViewImage5);
    console.log(cloneValues.typeIds);
    try {
      await axios({
        method: "put",
        url: `${baseURL}/api/houses/${houseId}?address=${
          cloneValues.address
        }&area=${cloneValues.area}&description=${description}&floor=4&name=${
          cloneValues.name
        }&price=${price}&roomNumber=${Number(cloneValues.roomNumber)}&toilet=${
          cloneValues.toilet
        }&typeHouses=&typeHouses=${cloneValues.typeIds}`, // data: {
        //   address: address,
        //   area: cloneValues.area,
        //   description: "czxczxczxczxc",
        //   detailSumary: cloneValues.detailSumary,
        //   image: image,
        //   name: cloneValues.name,
        //   price: price,
        //   typeIds: [1],
        // },
        data: formData,
        headers: {
          Authorization: userData.access_token,
          "Content-Type": "multipart/form-data",
        },
      })
        .then(function (response) {
          toast.success("S???a c??n h??? th??nh c??ng");
          console.log(response);
        })
        .catch(function (response) {
          toast.error("S???a c??n h??? th???t b???i");
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios({
          method: "get",
          url: `${baseURL}/api/houseTypes`,
        })
          .then(function (response) {
            setCategoriesData(response?.data?.data);
            console.log(response?.data?.data);
          })
          .catch(function (response) {
            toast.error("a");
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    reset({
      ...house,
    });
    setSelectCategory(house?.houseTypes);
    setDescription(house?.description);
  }, [house, reset, setValue]);

  return (
    <div className="rounded-xl bg-lite  py-10 px-[66px]">
      <div className="text-center">
        <h1 className="mb-10 inline-block rounded-xl bg-white py-4 px-[60px] text-center text-[25px]  font-semibold">
          Ch???nh s???a c??n h??? ???????
        </h1>
        <form onSubmit={handleSubmit(handleUpdateHouse)}>
          <FormRow>
            <FormGroup>
              <Label>T??n c??n h???* </Label>
              <Input
                control={control}
                name="name"
                placeholder="Nh???p t??n c??n h???"
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>Ch???n lo???i c??n h???* </Label>
              <Dropdown>
                <Select
                  placeholder={
                    selectCategory?.[0]?.name ||
                    getDropdownLabel("nameCategories") ||
                    "Ch???n lo???i c??n h???"
                  }
                ></Select>
                <List>
                  {categoriesData &&
                    categoriesData?.map((category) => (
                      <Option
                        key={category?.id}
                        onClick={() =>
                          handleSelectCategories(category?.code, category?.name)
                        }
                      >
                        <span className="capitalize">{category?.name}</span>
                      </Option>
                    ))}
                </List>
              </Dropdown>
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <Label>Nh?? v??? sinh* </Label>
              <Input
                control={control}
                name="toilet"
                placeholder="M?? t??? ng???n"
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>S??? ph??ng* </Label>
              <Input
                control={control}
                name="roomNumber"
                placeholder="S??? ph??ng "
              ></Input>
            </FormGroup>
          </FormRow>
          <div className="flex gap-x-3">
            <FormGroup>
              <Label>H??nh ???nh* </Label>
              <div className="mx-auto mb-10 h-[200px] w-[200px] rounded-full">
                <label
                  className={`group relative flex h-full min-h-[200px] w-full cursor-pointer items-center justify-center overflow-hidden  rounded-lg  border border-dashed bg-gray-100`}
                >
                  <input
                    type="file"
                    onChange={handleChange}
                    className="hidden"
                  />

                  {!preViewImage && !house?.image && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                  )}
                  {house?.image ? (
                    <img
                      src={preViewImage?.preview || house?.image}
                      className="h-full w-full object-cover "
                      alt=""
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                  )}
                </label>
              </div>
            </FormGroup>
            <FormGroup>
              <Label>H??nh ???nh* </Label>
              <div className="mx-auto mb-10 h-[200px] w-[200px] rounded-full">
                <label
                  className={`group relative flex h-full min-h-[200px] w-full cursor-pointer items-center justify-center overflow-hidden  rounded-lg  border border-dashed bg-gray-100`}
                >
                  <input
                    type="file"
                    onChange={handleChange1}
                    className="hidden"
                  />

                  {!preViewImage1 && !house?.image2 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                  )}
                  {house?.image2 ? (
                    <img
                      src={preViewImage1?.preview || house?.image2}
                      className="h-full w-full object-cover "
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                </label>
              </div>
            </FormGroup>
            <FormGroup>
              <Label>H??nh ???nh* </Label>
              <div className="mx-auto mb-10 h-[200px] w-[200px] rounded-full">
                <label
                  className={`group relative flex h-full min-h-[200px] w-full cursor-pointer items-center justify-center overflow-hidden  rounded-lg  border border-dashed bg-gray-100`}
                >
                  <input
                    type="file"
                    onChange={handleChange3}
                    className="hidden"
                  />

                  {!preViewImage3 && !house?.image3 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                  )}
                  {house?.image3 ? (
                    <img
                      src={preViewImage3?.preview || house?.image3}
                      className="h-full w-full object-cover "
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                </label>
              </div>
            </FormGroup>
            <FormGroup>
              <Label>H??nh ???nh* </Label>
              <div className="mx-auto mb-10 h-[200px] w-[200px] rounded-full">
                <label
                  className={`group relative flex h-full min-h-[200px] w-full cursor-pointer items-center justify-center overflow-hidden  rounded-lg  border border-dashed bg-gray-100`}
                >
                  <input
                    type="file"
                    onChange={handleChange4}
                    className="hidden"
                  />

                  {!preViewImage4 && !house?.image4 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                  )}
                  {house?.image4 ? (
                    <img
                      src={preViewImage4?.preview || house?.image4}
                      className="h-full w-full object-cover "
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                </label>
              </div>
            </FormGroup>
            <FormGroup>
              <Label>H??nh ???nh* </Label>
              <div className="mx-auto mb-10 h-[200px] w-[200px] rounded-full">
                <label
                  className={`group relative flex h-full min-h-[200px] w-full cursor-pointer items-center justify-center overflow-hidden  rounded-lg  border border-dashed bg-gray-100`}
                >
                  <input
                    type="file"
                    onChange={handleChange5}
                    className="hidden"
                  />

                  {!preViewImage5 && !house?.image5 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                  )}
                  {house?.image5 ? (
                    <img
                      src={preViewImage5?.preview || house?.image5}
                      className="h-full w-full object-cover "
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                </label>
              </div>
            </FormGroup>
          </div>
          <FormGroup>
            <Label>Chi ti???t c??n h???* </Label>
            <ReactQuill
              placeholder="writer detail house"
              modules={modules}
              theme="snow"
              value={description}
              onChange={setDescription}
            />
          </FormGroup>
          <FormRow>
            <FormGroup>
              <Label>Price*</Label>
              <Input
                control={control}
                name="price"
                placeholder="Price...."
              ></Input>
            </FormGroup>

            <FormGroup>
              <Label>Di???n t??ch* </Label>
              <Input
                control={control}
                name="area"
                placeholder="Nh???p t??n c??n h???"
              ></Input>
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <Label>?????a ch???</Label>
              {/* <FormThreeCol>
              <FormGroup>
                <Dropdown>
                  <Dropdown.Select
                    placeholder={getDropdownLabel("province") || "T???nh"}
                  ></Dropdown.Select>
                  <Dropdown.List>
                    {provinces &&
                      provinces.map((item) => (
                        <Dropdown.Option
                          key={item.name}
                          onClick={() =>
                            handleSelectAddress(
                              "province",
                              "provinceCode",
                              item.name,
                              item.code
                            )
                          }
                        >
                          <span className="capitalize">{item.name}</span>
                        </Dropdown.Option>
                      ))}
                  </Dropdown.List>
                </Dropdown>
              </FormGroup>
              <FormGroup>
                <Dropdown>
                  <Dropdown.Select
                    placeholder={getDropdownLabel("district") || "Th??nh ph???"}
                  ></Dropdown.Select>
                  <Dropdown.List>
                    {districts &&
                      districts.map((item) => (
                        <Dropdown.Option
                          key={item.name}
                          onClick={() =>
                            handleSelectAddress(
                              "district",
                              "districtCode",
                              item.name,
                              item.code
                            )
                          }
                        >
                          <span className="capitalize">{item.name}</span>
                        </Dropdown.Option>
                      ))}
                  </Dropdown.List>
                </Dropdown>
              </FormGroup>
              <FormGroup>
                <Dropdown>
                  <Dropdown.Select
                    placeholder={getDropdownLabel("ward") || "Ph?????ng/X??"}
                  ></Dropdown.Select>
                  <Dropdown.List>
                    {wards &&
                      wards.map((item) => (
                        <Dropdown.Option
                          key={item.name}
                          onClick={() =>
                            handleSelectAddress(
                              "ward",
                              "wardCode",
                              item.name,
                              item.code
                            )
                          }
                        >
                          <span className="capitalize">{item.name}</span>
                        </Dropdown.Option>
                      ))}
                  </Dropdown.List>
                </Dropdown>
              </FormGroup>
            </FormThreeCol> */}
              <Input
                control={control}
                name="address"
                placeholder="Nh???p ?????a ch??? c??n h???"
              ></Input>
            </FormGroup>
            {/* <FormGroup>
              <Field>
                <Label>Feature Post</Label>
                <Toggle
                  on={watchHot}
                  onClick={() => {
                    setValue("hot", !watchHot);
                  }}
                ></Toggle>
              </Field>
            </FormGroup> */}
          </FormRow>
          <Button
            kind="primary"
            className="mx-auto bg-primary px-10 text-white"
            type="submit"
          >
            S???a c??n h???
          </Button>
        </form>
      </div>
    </div>
  );
};

export default HouseUpdate;
