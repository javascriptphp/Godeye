import React, { useContext, useEffect } from "react";
import { Button, Col, message, Modal, Row, Space } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { WalletProviderContext } from "@/components/wallet/WalletProvider";
import { loginWithWallet } from "@/service";
import { SupportWallet } from "@/types";
import useStore from "@/utils/store";
import { useTranslation } from "react-i18next";

const ConnectWalletModal = ({
    onClose,
    onSuccess,
}: {
    onClose: VoidFunction;
    onSuccess: (r: any) => void;
}) => {
    const useWalletProvider = () => useContext(WalletProviderContext);
    const { wallets, connectWallet } = useWalletProvider();
    const { loginHandler } = useStore();
    const { selectedWallet, selectedAccount } = useWalletProvider();
    const { t } = useTranslation();
    const [messageApi, contextHolder] = message.useMessage();

    const handleCloseModal = () => {
        onClose();
    };

    useEffect(() => {
        const walletName = selectedWallet?.info.rdns as string;
        if (selectedAccount && selectedWallet) {
            loginWithWallet(
                SupportWallet.fromRdns(walletName).getName(),
                selectedAccount,
                loginHandler,
                messageApi
            ).then((r) => {
                handleCloseModal();
                onSuccess(r);
            });
        }
    }, [selectedWallet, selectedAccount]);
    return (
        <>
            <Modal
                title={
                    <Row>
                        <Col span={1}>
                            <InfoCircleOutlined />
                        </Col>
                        <Col
                            span={22}
                            style={{ textAlign: "center", fontSize: 20 }}
                        >
                            Connect Wallet
                        </Col>
                    </Row>
                }
                open={true}
                footer={null}
                onCancel={handleCloseModal}
                maskClosable={true}
                width={450}
                style={{ top: 300 }}
            >
                <div>{contextHolder}</div>
                <div
                    style={{
                        padding: "12px",
                        backgroundColor: "#1e1e1e",
                        borderRadius: "8px",
                    }}
                >
                    <Space
                        direction="vertical"
                        size={20}
                        style={{ display: "flex" }}
                    >
                        {SupportWallet.names().map(
                            (walletName: string, index: number) => {
                                const installedWallets = Object.values(
                                    wallets
                                ).map((provider: EIP6963ProviderDetail) => {
                                    return provider.info.rdns as string;
                                });
                                const isInstalled = (installedWallets.indexOf(
                                    SupportWallet.fromName(walletName).getRdns()
                                ) !== -1) as boolean;

                                return (
                                    <Row
                                        key={index}
                                        style={{
                                            marginBottom: "10px",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Col span={2}>
                                            <img
                                                src={SupportWallet.fromName(
                                                    walletName
                                                ).getIcon()}
                                                alt={walletName}
                                            />
                                        </Col>
                                        <Col span={1}></Col>
                                        <Col
                                            span={14}
                                            style={{
                                                color: "white",
                                                fontSize: "16px",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            <div>{walletName}</div>
                                        </Col>

                                        <Col span={6}>
                                            {isInstalled ? (
                                                <Button
                                                    block={true}
                                                    type="primary"
                                                    onClick={() =>
                                                        connectWallet(
                                                            SupportWallet.fromName(
                                                                walletName
                                                            ).getRdns()
                                                        )
                                                    }
                                                >
                                                    {t("connectWallet")}
                                                </Button>
                                            ) : (
                                                <Button
                                                    block={true}
                                                    disabled={true}
                                                    type="default"
                                                    onClick={() => {}}
                                                >
                                                    {t("installWallet")}
                                                </Button>
                                            )}
                                        </Col>
                                    </Row>
                                );
                            }
                        )}
                        {/*{Object.keys(wallets).length <= 0*/}
                        {/*	? "No Detected Wallet"*/}
                        {/*	: Object.values(wallets).map(*/}
                        {/*		(provider: EIP6963ProviderDetail) => {*/}
                        {/*			return (*/}
                        {/*				<Row*/}
                        {/*					key={provider.info.uuid}*/}
                        {/*					style={{marginBottom: "10px", alignItems: "center",}}*/}
                        {/*				>*/}
                        {/*					<Col span={2}>*/}
                        {/*						<img src={provider.info.icon} alt={provider.info.name}/>*/}
                        {/*					</Col>*/}
                        {/*					<Col span={1}></Col>*/}
                        {/*					<Col span={14} style={{color: "white", fontSize: "16px", fontWeight: "bold",}}>*/}
                        {/*						<div>{provider.info.name}</div>*/}
                        {/*					</Col>*/}
                        {/*					<Col span={6}><Button type="primary" onClick={() => connectWallet(provider.info.rdns)}>INSTALLED</Button></Col>*/}
                        {/*				</Row>*/}
                        {/*			);*/}
                        {/*		}*/}
                        {/*	)}*/}
                    </Space>
                </div>
            </Modal>
        </>
    );
};

export default ConnectWalletModal;
