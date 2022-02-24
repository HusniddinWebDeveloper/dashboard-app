import React, { useState, useRef } from "react";
import { Modal, Button, Col, Row, Upload, Input, Typography, Select, InputNumber } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {  addNewAllCategories } from "../../../redux/actions/action";
import {  UploadOutlined,PlusOutlined } from '@ant-design/icons';
import 'antd/dist/antd.min.css';

import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const { Text } = Typography;
const { Option } = Select;

const ModalWindow = ({store,idDlete,editDeleteController,setEditDeleteController,imgOne,setImgOne,imgTwo,setImgTwo,inputVal,setInputVal,selectVal,setSelectVal,priceAdd,setPrice,isModalVisible,setIsModalVisible}) => {
  const data = useSelector((store) => store.data.allCategories);
  const categoriesOption = useSelector((store) => store.data.categories);
  const dispatch = useDispatch();

  const [ warning, setWarning ] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
    setEditDeleteController(true);
  };

  const inputFileOne = useRef(null);

  const style = {
    outline: "none",
    border: "1px solid #c3c3c3",
    marginTop: "1rem",
    padding: "10px 1.3rem 10px 10px"
  }

  const handleOk = () => {
        if(inputVal !== "" && selectVal !== "" && selectVal !== "None" && priceAdd !== "") {
          if(editDeleteController) {
            const id = data.length + 1;
            const newItem = { 
              key: id, 
              no: id, 
              nomi: inputVal,
              categories: selectVal,
              price: priceAdd,
              img1: <img src={typeof(imgOne) === "object" ? imgOne.props.src : imgOne} style={{width: "5rem", height: "auto",}} alt={imgTwo} />,
              img2: <img src={imgTwo} style={{width: "5rem", height: "auto",}} alt={imgTwo} />,
            };
            dispatch(
              addNewAllCategories([
                  ...data,
                  newItem
                ]
              ));
            } else {
               const newItem = { 
                  key: idDlete, 
                  no: idDlete, 
                  nomi: inputVal,
                  categories: selectVal,
                  price: priceAdd,
                  img1: <img src={typeof(imgOne) === "object" ? imgOne.props.src : imgOne} style={{width: "5rem", height: "auto",}} alt={imgTwo} />,
                  img2: <img src={typeof(imgTwo) === "object" ? imgTwo.props.src : imgTwo} style={{width: "5rem", height: "auto",}} alt={imgTwo} />,
                }
               
                store.splice(idDlete-1,1,newItem)
                dispatch(addNewAllCategories(store));
            }

          setInputVal("");
          setSelectVal("");
          setPrice("");

          setIsModalVisible(false);
          setWarning(false);
        } else {
          setWarning(true);
        }
  };

  const getInputVal = (e) => {
    setInputVal(e.target.value);
  };
  const getSelectVal = (e) => {
    setSelectVal(e);
  };
  const getPriceVal = (e) => {
    setPrice(e.target.value);
  };


  const imgHendler = (e) => {
    const reader = new FileReader();
    reader.onload= () => {
      if(reader.readyState === 2) {
        setImgTwo(reader.result);
      }
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  const imgHendlerSecond = (e) => {
    const reader = new FileReader();
    reader.onload= () => {
      if(reader.readyState === 2) {
        setImgOne(reader.result);
      }
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  // cancel btn
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button icon={<PlusOutlined/>} type="primary" onClick={showModal}>
        Add
      </Button>
      <Modal
        title="Add new categories"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input.Group size="large">
          <Row gutter={8}>
            <Col span={10}>
               <Input
                value={inputVal}
                onChange={getInputVal}
                placeholder="Name"
              />
                <input
                style={style}
                  type="number"
                  ref={inputFileOne}
                  value={priceAdd} 
                  onChange={getPriceVal}
                  placeholder="Price" />
            </Col>
            <Col span={8}>
              <Select style={{minWidth: "120px"}} value={selectVal} onChange={getSelectVal} >
                  {categoriesOption.map((item) => {
                    return<Option value={item.nomi} key={item.key}>{item.nomi}</Option>
                    })}
              </Select>
                <label htmlFor="file-upload" className="custom-file-upload">
                 <input onChange={imgHendlerSecond} id="file-upload" type="file"/>
                  Image-1 Upload
                </label>
                <label htmlFor="file-upload2" className="custom-file-upload">
                 <input onChange={imgHendler} id="file-upload2" type="file"/>
                  Image-2 Upload
                </label>
            </Col>
          </Row>
      </Input.Group>
        {warning ? <Text type="danger">Iltmos biror narsa yozing</Text> : ""}
      </Modal>
    </>
  );
};

export default ModalWindow;