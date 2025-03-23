import {Button, Modal, Space, Tag, Typography} from "antd";
import {CloseOutlined, LikeOutlined, MessageOutlined, ShareAltOutlined} from "@ant-design/icons";
import React from "react";
import {BTCPrice, TweetPost} from "@/types";

export const TweetModal = ({isModalVisible, setIsModalVisible, prices, tweets, selectedTweet}: {
	isModalVisible: boolean,
	setIsModalVisible: (val: boolean) => void,
	prices: BTCPrice[],
	tweets: TweetPost[],
	selectedTweet: TweetPost
}) => {
	return (
		<Modal
			open={isModalVisible}
			onCancel={() => setIsModalVisible(false)}
			footer={null}
			closable={false}
			// width={screens.md ? 800 : '90%'}
			style={
				{
					marginTop: "120px"
				}
			}
		>
			{/* 头部 */}
			<div style={{
				display: 'flex',
				justifyContent: 'space-between',
				// alignItems: 'center',
				marginBottom: 24
			}}>
				<Typography.Title level={3}>推文详情</Typography.Title>
				<Button
					type="text"
					icon={<CloseOutlined/>}
					onClick={() => setIsModalVisible(false)}
					// style={{ color: '#ff4d4f' }}
				/>
			</div>

			{/* 内容布局 */}
			<div style={{
				display: 'grid',
				// gridTemplateColumns: screens.md ? '2fr 1fr' : '1fr',
				gap: 32
			}}>
				{/* 左侧主要内容 */}
				<div>
					<Typography.Paragraph style={{
						whiteSpace: 'pre-wrap',
						marginBottom: 10,
						lineHeight: 1.6
					}}>
						{selectedTweet.text}
					</Typography.Paragraph>

					<Space size={[8, 16]} wrap>
						标签：
						{selectedTweet.keywords.map(tag => (
							<Tag key={tag} bordered={false} style={{}}>
								{tag}
							</Tag>
						))}
					</Space>
				</div>

				{/* 右侧元数据 */}
				<div>
					<Space direction="vertical" size={16}>
						<Space>
							<div>
								<Typography.Text type="secondary">{selectedTweet.createDateTime}</Typography.Text>
							</div>
							<div>
								<Typography.Link href={selectedTweet.url}>原贴链接</Typography.Link>
							</div>
						</Space>
						<Space size={24} style={{marginTop: 10}}>
							<div>
								<LikeOutlined style={{color: '#8c8c8c'}}/>
								<Typography.Text type="secondary" style={{marginLeft: 8}}>
									{selectedTweet.likeCount || 0}
								</Typography.Text>
							</div>
							<div>
								<MessageOutlined style={{color: '#8c8c8c'}}/>
								<Typography.Text type="secondary" style={{marginLeft: 8}}>
									{selectedTweet.replyCount || 0}
								</Typography.Text>
							</div>
							<div>
								<ShareAltOutlined style={{color: '#8c8c8c'}}/>
								<Typography.Text type="secondary" style={{marginLeft: 8}}>
									{selectedTweet.retweetCount || 0}
								</Typography.Text>
							</div>
						</Space>
						<Space size={36}>
							<div>
								<Typography.Text strong>比特币价格：</Typography.Text>
								<Typography.Text strong style={{color: '#389e0d'}}>
									{prices[tweets.indexOf(selectedTweet)]?.price}
								</Typography.Text>
							</div>

							<div>
								<Tag
									color="red"
									bordered={false}
									style={{
										background: '#fff1f0',
										border: '1px solid #ffccc7',
										color: '#cf1322'
									}}
								>
									情感分析：{selectedTweet.sentiment}
								</Tag>
							</div>
						</Space>
					</Space>
				</div>
			</div>
		</Modal>
	);
}