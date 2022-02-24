import React, { useState } from "react";
import { Modal, Button, Input, Typography } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {  addNewCategories } from "../../../redux/actions/action";

const { Text } = Typography;

const ModalWindow = () => {
  const data = useSelector((store) => store.data.categories);
  const dispatch = useDispatch();

  const [ warning, setWarning ] = useState(false);

  const [inputVal, setInputVal] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if(inputVal !== "") {
      const id = data.length + 1;
      const newItem = { key: id, no: id, nomi: inputVal,};
      dispatch(
        addNewCategories([
          ...data,
          newItem
        ])
      );
      setInputVal("");
      setIsModalVisible(false);
      setWarning(false);
    } else {
      setWarning(true);
    }
  };

  const getInputVal = (e) => {
    setInputVal(e.target.value);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add
      </Button>
      <Modal
        title="Add new categories"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          value={inputVal}
          onChange={getInputVal}
          placeholder="Add categories"
        />
        {warning ? <Text type="danger">Iltmos biror narsa yozing</Text> : ""}
        
      </Modal>
    </>
  );
};

export default ModalWindow;
