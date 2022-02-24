import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Mix } from '@ant-design/plots';
import Data from "../../assets/Data";
import { useSelector, useDispatch } from "react-redux";

const DemoMix = () => {
  const [data, setData] = useState({});
  const store = useSelector((store) => store.data);

  const [productsChart, setProductsChart] = useState([]);
  const [categoriesChart, setCategoriesChart] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    setData(Data);

    // Product chart
    const products = store.allCategories;
  	const productsArray = [];
  	const categoriesGroup = [];
  	products.map((item) => {
  		categoriesGroup.push(item.categories);
  		const prod  =
  				{
				  "area": item.nomi,
			      "name": item.categories,
			      "bill": Number(item.price),
  				};
  				productsArray.push(prod);
  		});
  	setProductsChart(productsArray);

  	// Categories chart

  	const categories = store.categories;
  	const categroiesChartData = [];
  	categories.map((itemCategories) => {
  		let counter = 0;
  		categoriesGroup.filter((item) => {
  			if(itemCategories.nomi === item){
  				counter += 1;
  			}
  		});

  		const categorie = {
					       "area": itemCategories.nomi,
					       "cat": itemCategories.key,
					       "count": counter
					   };
		categroiesChartData.push(categorie);
  	});
  	setCategoriesChart(categroiesChartData);
  };
  if (!Object.keys(data).length) {
    return null;
  }

 
  const config = {
    tooltip: false,
    plots: [
      {
        type: 'bar',
        region: {
          start: {
            x: 0,
            y: 0,
          },
          end: {
            x: 0.45,
            y: 0.45,
          },
        },
        options: {
          data: categoriesChart,
          xField: 'count',
          yField: 'area',
          seriesField: 'cat',
          isStack: true,
          tooltip: {
            shared: true,
            showCrosshairs: false,
            showMarkers: false,
          },
          label: {},
          interactions: [
            {
              type: 'active-region',
            },
          ],
        },
      },
      {
        type: 'pie',
        region: {
          start: {
            x: 0.5,
            y: 0,
          },
          end: {
            x: 1,
            y: 0.45,
          },
        },
        options: {
          data: productsChart,
          angleField: 'bill',
          colorField: 'area',
          tooltip: {
            showMarkers: false,
          },
          radius: 0.85,
          label: {
            type: 'inner',
            formatter: '{name}',
            offset: '-15%',
          },
          interactions: [
            {
              type: 'element-active',
            },
            // 后续开放
            // {
            //   type: 'association-tooltip',
            //   cfg: {
            //     start: [
            //       {
            //         trigger: 'element:mousemove',
            //         action: 'association:showTooltip',
            //         arg: {
            //           dim: 'x',
            //           linkField: 'area',
            //         },
            //       },
            //     ],
            //   },
            // },
            // {
            //   type: 'association-highlight',
            //   cfg: {
            //     start: [
            //       {
            //         trigger: 'element:mousemove',
            //         action: 'association:highlight',
            //         arg: {
            //           linkField: 'area',
            //         },
            //       },
            //     ],
            //   },
            // },
          ],
        },
      },
      {
        type: 'area',
        region: {
          start: {
            x: 0,
            y: 0.5,
          },
          end: {
            x: 1,
            y: 0.95,
          },
        },
        options: {
          data: data.line,
          xField: 'time',
          yField: 'value',
          seriesField: 'area',
          line: {},
          point: {
            style: {
              r: 2.5,
            },
          },
          meta: {
            time: {
              range: [0, 1],
            },
          },
          smooth: true,
          tooltip: {
            showCrosshairs: true,
            shared: true,
          },
        },
      },
    ],
  };

  return <Mix {...config} />;
};

export default DemoMix;