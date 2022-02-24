import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import { addNewCategories } from "../../redux/actions/action";
import ModalWindow from './Modal/Modal';

import { Table, Button, Space } from 'antd';
const { Column } = Table;


const Categories = () => {
    const data = useSelector(store => store.data.categories);
    const dispatch = useDispatch();

    const deleteItem = (id) => {
      const newData = data.filter(item => item.key !== id)
      dispatch(addNewCategories(newData));
    }
    return (
        <>
          <Table dataSource={data} scroll={{ y: 400 }}>
            <Column title="No" dataIndex="no" key="no" />
            <Column title="Nomi" dataIndex="nomi" key="nomi" />
            <Column
              title={<ModalWindow/>}
              key="action"
              render={(text, record) => (
                <Space size="middle">
                  <Button onClick={() => deleteItem(record.no)} type="danger">Delete</Button>
                </Space>
              )}
            />
          </Table>
        </>
    );
};

export default Categories;