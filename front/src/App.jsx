import { useEffect, useState } from "react";
import {
	Card,
	Space,
	Select,
	Form,
	Input,
	Checkbox,
	Button,
	Modal,
	Image,
} from "antd";
import { Tabs } from "antd";
import axios from "axios";

const App = () => {
	const [form] = Form.useForm();
	const [data, setData] = useState([]);
	const [type, setType] = useState("gardening");
	const [tab, setTab] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedFlower, setSelectedFlower] = useState(null);

	const showModal = (flower) => {
		form.setFieldsValue(flower);
		setSelectedFlower(flower);
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const fetchFlowers = () => {
		axios.get(`http://localhost:3000/flower?type=${type}`).then((res) => {
			setData(res.data.data);
		});
	};
	const deleteFlower = (id) => {
		axios.delete(`http://localhost:3000/flower/${id}`).then((res) => {
			fetchFlowers();
		});
	};
	const onChangeType = (val) => {
		setType(val);
	};
	const onFinishPost = (values) => {
		axios.post("http://localhost:3000/flower", values).then((res) => {
			console.log(res);
		});
	};
	const onFinishEdit = (values) => {
		axios
			.put(`http://localhost:3000/flower/${selectedFlower._id}`, values)
			.then((res) => {
				fetchFlowers();
				setIsModalOpen(false);
			});
	};
	const items = [
		{
			key: "1",
			label: "Rendering",
			children: (
				<>
					<div>
						<Select
							defaultValue={"gardening"}
							onChange={onChangeType}
							style={{ width: 120 }}
							options={[
								{ value: "gardening", label: "gardening" },
								{ value: "homepot", label: "homepot" },
								{ value: "domestic", label: "domestic" },
							]}
						/>
					</div>
					<div
						style={{
							width: "100%",
							display: "grid",
							gridTemplateRows: "1fr 1fr 1fr",
							gridTemplateColumns: "1fr 1fr 1fr",
							gap: "20px",
						}}
					>
						{data.map((flower) => {
							return (
								<Card
									key={flower._id}
									title="Default size card"
									extra={
										<>
											<Button onClick={() => showModal(flower)}>Edit</Button>
											<Button danger onClick={() => deleteFlower(flower._id)}>
												Delete
											</Button>
										</>
									}
									style={{ width: "100%" }}
								>
									<Image
										fallback="https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png"
										preview={false}
										src={flower.image}
										width={"100%"}
									/>
									<p>{flower.title}</p>
									<p>{flower.description}</p>
								</Card>
							);
						})}
					</div>
				</>
			),
		},
		{
			key: "2",
			label: "Actions",
			children: (
				<>
					<Form
						name="basic"
						labelCol={{
							span: 8,
						}}
						wrapperCol={{
							span: 16,
						}}
						style={{
							maxWidth: 600,
						}}
						initialValues={{
							remember: true,
						}}
						onFinish={onFinishPost}
						autoComplete="off"
					>
						<Form.Item
							label="Image"
							name="image"
							rules={[
								{
									required: true,
									message: "Please input your image!",
								},
							]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Title"
							name="title"
							rules={[
								{
									required: true,
									message: "Please input your title!",
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							label="Description"
							name="description"
							rules={[
								{
									required: true,
									message: "Please input your description!",
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							label="Type"
							rules={[
								{
									required: true,
									message: "Please select your type!",
								},
							]}
							name="type"
						>
							<Select
								options={[
									{ value: "gardening", label: "gardening" },
									{ value: "homepot", label: "homepot" },
									{ value: "domestic", label: "domestic" },
								]}
							/>
						</Form.Item>

						<Form.Item
							wrapperCol={{
								offset: 8,
								span: 16,
							}}
						>
							<Button type="primary" htmlType="submit">
								Submit
							</Button>
						</Form.Item>
					</Form>
				</>
			),
		},
	];
	useEffect(fetchFlowers, [type, tab]);

	return (
		<>
			<Modal
				title="Basic Modal"
				open={isModalOpen}
				onCancel={handleCancel}
				footer={[]}
			>
				<Form
					form={form}
					name="basic"
					labelCol={{
						span: 8,
					}}
					wrapperCol={{
						span: 16,
					}}
					style={{
						maxWidth: 600,
					}}
					onFinish={onFinishEdit}
					autoComplete="off"
				>
					<Form.Item
						label="Image"
						name="image"
						rules={[
							{
								required: true,
								message: "Please input your image!",
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Title"
						name="title"
						rules={[
							{
								required: true,
								message: "Please input your title!",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Description"
						name="description"
						rules={[
							{
								required: true,
								message: "Please input your description!",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Type"
						rules={[
							{
								required: true,
								message: "Please select your type!",
							},
						]}
						name="type"
					>
						<Select
							options={[
								{ value: "gardening", label: "gardening" },
								{ value: "homepot", label: "homepot" },
								{ value: "domestic", label: "domestic" },
							]}
						/>
					</Form.Item>

					<Form.Item
						wrapperCol={{
							offset: 8,
							span: 16,
						}}
					>
						<Space>
							<Button type="primary" danger onClick={handleCancel}>
								Cancel
							</Button>
							<Button type="primary" htmlType="submit">
								Submit
							</Button>
						</Space>
					</Form.Item>
				</Form>
			</Modal>
			<Tabs
				defaultActiveKey="1"
				onChange={(val) => setTab(val)}
				items={items}
			/>
		</>
	);
};
export default App;
