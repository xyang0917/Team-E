
## 添加10个员工，每次调用calculateRunway函数gas消耗记录（优化前）
NO	transaction cost	execution cost	address	                                        salary
1	22995	            1723	        0x14723a09acff6d2a60dcdf7aa4aff308fddc160c	    2
2	23776	            2504	        0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db	    2
3	24557	            3285	        0x583031d1113ad414f02576bd6afabfb302140225	    2
4	25338	            4066	        0xdd870fa1b7c4700f2bd7f44238821c26f7392148	    2
5	26119	            4847	        0xf7502840b51f5459c67747810f3b7b9c20f98665	    2
6	26900	            5628	        0x2d6d3faf7d9a0a997a99542a93a3b89190ce01ac	    2
7	27681	            6409	        0x8f9135c12e8e7729adecd339601c5998c8069729	    2
8	28462	            7190	        0xef8c7228db45de7b2f15196f2129018dbd7712ea	    2
9	96766	            73894	        0x30a53ad7889ba7cd1918f6f8b50c4cdfa698ce61	    2
10	30024	            8752	        0x6a7371605599a6720d934854b45938de21a8c4a5	    2
			

>>> 说明：每次调用calculateRunway与上一次调用所消耗gas数都不一样，相差781个gas。原因是每添加一个员工，存储员工的动态数组就会新添加一个元素，在循环获取员工总薪时就会多遍历一次，所以每次调用都会在上一次调用所消耗的gas上增加781左右的gas           