import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';
import { Button, Input, Form, message, Upload, Card } from "antd";
import styled from "styled-components";
import useStore from "@/utils/store";
import { LinkOutlined } from "@ant-design/icons";
import { WalletProvider } from "@/components/wallet/WalletProvider";
import ConnectWalletModal from "@/components/wallet/ConnectWalletModal";
import { KoliFooter } from "@/components/koli/KoliFooter";
import contractABI from '@/assets/contract-abi.json';

const contractAddress = '0xF0667CAAFd262De4210E536F7eb27c36B9856257';


const Mint: React.FC = () => {
    const [showWalletList, setShowWalletList] = useState(false);
    const [gasFeesGroup, setGasFeesGroup] = useState(null);
    const [loading, setLoading] = useState(false);
    const [transactionHash, setTransactionHash] = useState<string | null>(null);

    const createEthereumContract = async () => {
        if (!window.ethereum) {
            console.error("请安装 MetaMask！");
            return;
        }
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner(); // 确保 signer 是异步获取的
        const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
        // 获取当前Gas费用估算
        // const feeData = await provider.getFeeData();
        // // 设置交易参数
        // const txParams = {
        //     value: ethers.parseEther('0.01'), // Mint价格(ETH)
        //     maxFeePerGas: feeData.maxFeePerGas,
        //     maxPriorityFeePerGas: feeData.maxPriorityFeePerGas
        // };
        // 0.0001 + 0.0001 * 3%
        const mintPrice = ethers.parseEther("0.000103");
        
        const tx = await transactionsContract.mint(location.href, {
            value: mintPrice
        });
        // 6. 等待交易确认
        const receipt = await tx.wait();
        console.log('交易成功:', receipt);
        
        // 获取交易哈希并设置
        setTransactionHash(tx.hash);
    };
    
    const handleMint = async () => {
        setLoading(true);
        setTransactionHash(null);
        try {
            await createEthereumContract();
        } catch (error) {
            message.error("交易失败，请检查错误信息");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleConnectWallet = () => {
        setShowWalletList(true);
    }

    const onWalletLoginSuccess = (r: any) => {
        if (r.email) {
            message.success('登陆成功');
            getGasFees();
        } else {
            message.error('登陆失败');
        }
    };

    const getGasFees = async () => {
        if (!window.ethereum) {
            console.error("请安装 MetaMask！");
            return;
        }
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []); // 请求用户授权

            // 获取 Gas 费用数据
            const feeData = await provider.getFeeData();

            // 转换为 ETH 单位
            const gasInfo = {
                lastBaseFeePerGas: feeData.lastBaseFeePerGas
                    ? ethers.formatUnits(feeData.lastBaseFeePerGas, "ether") + " ETH"
                    : "N/A (EIP-1559)",

                maxFeePerGas: feeData.maxFeePerGas
                    ? ethers.formatUnits(feeData.maxFeePerGas, "ether") + " ETH"
                    : "N/A",

                maxPriorityFeePerGas: feeData.maxPriorityFeePerGas
                    ? ethers.formatUnits(feeData.maxPriorityFeePerGas, "ether") + " ETH"
                    : "N/A",

                gasPrice: feeData.gasPrice
                    ? ethers.formatUnits(feeData.gasPrice, "ether") + " ETH"
                    : "N/A (EIP-1559)",
            };

            console.log("Gas 费用（ETH 单位）:", gasInfo);
            setGasFeesGroup(gasInfo);

        } catch (error) {
            console.error("获取 Gas 费用失败:", error);
            throw error;
        }
    }

    return <PageContainer>
        <ConnectWallet>
            <SwitchButton
                icon={<LinkOutlined />}
                onClick={() => handleConnectWallet()}
            >
                连接钱包
            </SwitchButton>
        </ConnectWallet>
        <PricingCard
            title={"NFT Mint"}
            $isActive={false}
        >
            {/* <Dragger {...draggerProps}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">点击或拖拽上传图片</p>
            </Dragger> */}
            <FeatureList>
                <FeatureItem>
                    初始价格
                    <FeatureIcon $available={true}>
                        0.0001 ETH
                    </FeatureIcon>
                </FeatureItem>
                <FeatureItem>
                    Gas费用
                    <FeatureIcon $available={true}>
                        {gasFeesGroup ? <p>
                            Last Base Fee: {gasFeesGroup.lastBaseFeePerGas};<br />
                            Max Fee: {gasFeesGroup.maxFeePerGas};<br />
                            Priority Fee: {gasFeesGroup.maxPriorityFeePerGas};<br />
                            Gas Price: {gasFeesGroup.gasPrice};
                        </p> : '--'}
                    </FeatureIcon>
                </FeatureItem>
                <FeatureItem>
                    平台服务费
                    <FeatureIcon $available={true}>
                        3%
                    </FeatureIcon>
                </FeatureItem>
            </FeatureList>

            <ActionButton onClick={handleMint} loading={loading}>
                {loading ? 'Minting...' : 'Mint'}
            </ActionButton>

            {transactionHash && (
                <div>
                    <p style={{marginTop: 20, textAlign: 'center'}}>交易成功！请查看区块链浏览器链接：
                        <a href={`https://base-sepolia.blockscout.com/tx/${transactionHash}`} target="_blank" rel="noopener noreferrer">
                            查看交易
                        </a>
                    </p>
                </div>
            )}
        </PricingCard>
        <KoliFooter />

        {showWalletList && (
            <WalletProvider>
                <ConnectWalletModal
                    onClose={() => setShowWalletList(false)}
                    onSuccess={onWalletLoginSuccess}
                />
            </WalletProvider>
        )}

    </PageContainer>
}

export default Mint;


const PageContainer = styled.div`
    padding: 20px;
    max-width: 100%;
    overflow-x: hidden;

    @media (min-width: 576px) {
		    padding: 20px 40px;
		}

    @media (min-width: 992px) {
        padding: 100px 240px;
    }
`;

const PricingCard = styled(Card) <{ $isActive?: boolean }>`
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    background: ${(props) =>
        props.$isActive ? "rgba(23, 35, 50, 0.85)" : "rgba(17, 25, 40, 0.75)"};
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.1);

    // &:hover {
    //     transform: translateY(-5px);
    //     box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
    // }

    .ant-card-head {
        border-bottom: none;
        padding: 1.5rem 1.5rem 0.5rem !important;
        background-color: ${(props) =>
        props.$isActive
            ? "rgba(23, 35, 50, 0.85)"
            : "rgba(17, 25, 40, 0.75)"};
    }

    .ant-card-head-title {
        color: white;
        font-size: 1.5rem;
        text-align: center;
        font-weight: bold;
        font-family: "YouSheBiaoTiHei", sans-serif;

        @media (max-width: 768px) {
            font-size: 1.3rem;
        }
    }

    .ant-card-body {
        padding: 1.5rem !important;

        @media (max-width: 768px) {
            padding: 1.2rem !important;
        }
    }
`;

const FeatureList = styled.div`
    margin: 2rem 0;

    @media (max-width: 768px) {
        margin: 1.5rem 0;
    }
`;

const FeatureItem = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    color: white;
    justify-content: space-between;

    @media (max-width: 768px) {
        margin-bottom: 0.8rem;
        font-size: 0.95rem;
    }
`;

const ActionButton = styled(Button) <{ $isPrimary?: boolean }>`
    width: 100%;
    height: 45px;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: bold;
    margin-top: 1rem;

    ${(props) =>
        props.$isPrimary
            ? `
    background-color: #00ffa3 !important;
    border-color: #00ffa3 !important;
    color: #0a0e14 !important;
    
    &:hover {
      background-color: #00cc82 !important;
      border-color: #00cc82 !important;
    }
  `
            : `
    background-color: transparent !important;
    border-color: #00ffa3 !important;
    color: #00ffa3 !important;
    
    &:hover {
      background-color: rgba(0, 255, 163, 0.1) !important;
    }
  `}
`;

const FeatureIcon = styled.span<{ $available: boolean }>`
    margin-right: 0.5rem;
    color: ${(props) => (props.$available ? "#00ffa3" : "#ff4d4f")};
`;

const ConnectWallet = styled.div`
    display: flex;
    justify-content: end;
    margin-bottom: 14px;
`;


const SwitchButton = styled(Button)`
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(90deg, #b1fb83 0%, #28e89b 100%);
    color: #000;
    border: none;
    border-radius: 20px;
    height: 36px;
    padding: 0 15px;
    font-weight: 500;
    font-size: 0.9rem;
    box-shadow: 0 4px 10px rgba(40, 232, 155, 0.3);
    transition: all 0.3s ease;

    @media (min-width: 640px) {
        height: 40px;
        padding: 0 20px;
        font-size: 1rem;
    }

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 15px rgba(40, 232, 155, 0.4);
        background: linear-gradient(90deg, #c5fc9e 0%, #3dfbad 100%);
        color: #000;
    }

    &:active {
        transform: translateY(1px);
        box-shadow: 0 2px 8px rgba(40, 232, 155, 0.3);
    }

    .anticon {
        margin-left: 6px;
        font-size: 14px;

        @media (min-width: 640px) {
            margin-left: 8px;
            font-size: 16px;
        }
    }
`;