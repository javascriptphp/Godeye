import { useState, useEffect } from 'react';
import { FixedSizeList as VirtualList } from 'react-window';
import {Input, Pagination, Spin, Alert, Card} from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

interface Tweet {
	id: string;
	content: string;
	date: string;
	author: string;
}

export const TweetCard = () => {
	// 组件状态管理
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(20); // 默认每页50条
	const [searchQuery, setSearchQuery] = useState('');
	const [tweets, setTweets] = useState<Tweet[]>([]);
	const [totalTweets, setTotalTweets] = useState(0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [mockTweets, setMockTweets] = useState<Tweet[]>([]); // 新增状态

	// 模拟数据
	useEffect(() => {
		const generatedTweets: Tweet[] = Array.from({ length: 100 }, (_, index) => ({
			id: `tweet-${index + 1}`,
			content: `这是第 ${index + 1} 条推文的内容。`,
			date: new Date().toISOString(),
			author: `作者 ${index + 1}`
		}));

		// setMockTweets(generatedTweets); // 设置 mockTweets
		setTweets(generatedTweets); // 设置 mockTweets
		setTotalTweets(generatedTweets.length);
	}, []);

	// 获取数据逻辑
	const fetchTweets = async () => {
		setLoading(true);
		setError(null);

		try {
			// 模拟 API 调用延迟
			await new Promise((resolve) => setTimeout(resolve, 500));

			// 这里可以根据 currentPage 和 pageSize 来分页 mock 数据
			const start = (currentPage - 1) * pageSize;
			const end = start + pageSize;
			const paginatedTweets = tweets.slice(start, end); // 使用 mockTweets

			console.log(paginatedTweets)
			setTweets(paginatedTweets);
		} catch (err) {
			setError('数据加载失败，请稍后重试');
		} finally {
			setLoading(false);
		}
	};

	// 数据加载触发器
	useEffect(() => {
		// fetchTweets();
	}, [currentPage, pageSize, searchQuery]);

	// 虚拟列表项渲染
	const VirtualRow = ({ index, style }: { index: number; style: React.CSSProperties }) => (
		<div style={{
			...style,
			padding: '16px 24px',
			// borderBottom: '1px solid #f0f0f0',
			boxSizing: 'border-box'
		}}>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<span style={{  fontWeight: 500 }}>{tweets[index].author}</span>
				<span style={{  }}>{tweets[index].date}</span>
			</div>
			<div style={{
				// color: 'rgba(0,0,0,0.65)',
				marginTop: 8,
				lineHeight: 1.6,
				whiteSpace: 'pre-wrap'
			}}>
				{tweets[index].content}
			</div>
		</div>
	);

	return (
		<div>
			{/* 搜索栏 */}
			<div style={{ padding: 24, borderBottom: '1px solid #f0f0f0' }}>
				<Search
					placeholder="搜索推文内容..."
					enterButton={
						<div>
							<SearchOutlined />
							<span style={{ marginLeft: 8 }}>搜索</span>
						</div>
					}
					onSearch={(value) => {
						setSearchQuery(value);
						setCurrentPage(1); // 搜索后重置到第一页
					}}
					allowClear
				/>
			</div>

			{/* 内容区域 */}
			<div style={{ flex: 1, position: 'relative' }}>
				{error && (
					<Alert
						message="错误提示"
						description={error}
						type="error"
						showIcon
						style={{ margin: 24 }}
					/>
				)}

				<Spin spinning={loading} tip="数据加载中...">
					{tweets.length > 0 ? (
						<VirtualList
							height={600}  // 根据实际需要调整
							width="100%"
							itemCount={tweets.length}
							itemSize={120} // 根据内容高度调整
							overscanCount={5} // 预渲染数量
						>
							{VirtualRow}
						</VirtualList>
					) : (
						<div style={{
							padding: 40,
							textAlign: 'center',
							// color: 'rgba(0,0,0,0.25)'
						}}>
							暂无相关推文
						</div>
					)}
				</Spin>
			</div>

			{/* 分页控件 */}
			<div style={{
				padding: '16px 24px',
				borderTop: '1px solid #f0f0f0',
				// background: '#fff'
			}}>
				<Pagination
					current={currentPage}
					pageSize={pageSize}
					total={totalTweets}
					align={"center"}
					onChange={(page, size) => {
						setCurrentPage(page);
						setPageSize(size);
					}}
					showSizeChanger
					showTotal={(total) => `共 ${total} 条推文`}
					pageSizeOptions={['20', '50', '100']}
					style={{ textAlign: 'center' }}
				/>
			</div>
		</div>
	);
};
