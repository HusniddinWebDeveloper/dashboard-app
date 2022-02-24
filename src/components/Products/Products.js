import React, {useState, useEffect} from "react";
import { Table, Button } from 'antd';
import Modal from "./Modal-produts/Modal";
import { useSelector, useDispatch } from "react-redux";
import { addNewAllCategories } from "../../redux/actions/action";
import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const Products = () => {

  const data = useSelector((store) => store.data.allCategories);
  const dataForSave = useSelector((store) => store.data);
  const dispatch = useDispatch();
  const [editDeleteController, setEditDeleteController] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputVal, setInputVal] = useState();
  const [selectVal, setSelectVal] = useState("None");
  const [priceAdd,setPrice] = useState();
  const [imgOne, setImgOne] = useState('');
  const [imgTwo, setImgTwo] = useState('');

  const [store, setStore] = useState([]);
  const [idDlete, setIdDelete] = useState();
  const [filterStore, setFilterStore] = useState([]);

  useEffect(() => {
    filter(dataForSave.categories);
  },[dataForSave.categories]);

  const deleteHendler = () => {
    const str = data;
        idDlete.map(idItem => {
          return data.map((item, index) => {
            if(item.key === idItem) {
             return str.splice(index, 1);
            } return str;
          })
        });
        dispatch(addNewAllCategories(str));  
  }

  const editProducts = () => {
    setEditDeleteController(false);
    setStore([...data]);
    const [newData] = data.filter(item => item.key === idDlete[0]);
    setIsModalVisible(true);
    setInputVal(newData.nomi);
    setSelectVal(newData.categories);
    setPrice(newData.price);
    setImgOne(newData.img1);
    setImgTwo(newData.img2);
  }

  const filter = (dStor) => {
    const filterData = dStor;
    const newArr = [];
    filterData.map(item => {
      return newArr.push({
        text: item.nomi,
        value: item.nomi
      });
    });
    setFilterStore(newArr);
  }

  const columns = [
  {
    title: "№",
    dataIndex: "no",
    key: "no"
  },
  {
    title: "Nomi",
    dataIndex: "nomi",
    key: "nomi"
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price"
  },
  {
    title: "Categories",
    dataIndex: "categories",
    key: "categories",
    filters: filterStore,
    onFilter: (value, record) => record.categories.indexOf(value) === 0 
  },
  {
    title: "Image-1",
    dataIndex: "img1",
    key: "img1"
  },
  {
    title: "Image-2",
    dataIndex: "img2",
    key: "img2"
  },

]

  return (

    <>
      <Modal 
            store={store}
            inputVal={inputVal}
            setInputVal={setInputVal}
            selectVal={selectVal}
            setSelectVal={setSelectVal}
            priceAdd={priceAdd}
            setPrice={setPrice}
            imgOne={imgOne}
            setImgOne={setImgOne}
            imgTwo={imgTwo}
            setImgTwo={setImgTwo}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            editDeleteController={editDeleteController}
            setEditDeleteController={setEditDeleteController}
            idDlete={idDlete}/>
      <Button onClick={editProducts} style={{background: "yellow", fontSize: "14px", textAlign: "center", color: "red"}} icon={<EditOutlined />}>Edit</Button>
      <Button onClick={deleteHendler} type="danger" icon={<DeleteOutlined />}>Delete</Button>
      
      <Table 
         scroll={{ y: 400 }}
         rowSelection={{
            type: "checkbox",
            onChange: (e) => {
              setIdDelete(e);
            }
      }} dataSource={data} columns={columns}>
      </Table>
      </>
  );
};





export default Products;
