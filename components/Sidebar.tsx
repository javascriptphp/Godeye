import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 240px;
  background-color: #f5f5f5;
  padding: 20px;
  border-right: 1px solid #ddd;
`;

const MenuItem = styled.div`
  padding: 10px 0;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  
  &:hover {
    background-color: #eee;
  }
`;

const Sidebar = () => {
    return (
        <SidebarContainer>
            <MenuItem>电力/哈希</MenuItem>
            <MenuItem>顶级权重</MenuItem>
            <MenuItem>总的权重</MenuItem>
            <MenuItem>哈希值</MenuItem>
            <MenuItem>顶/底值</MenuItem>
        </SidebarContainer>
    );
};

export default Sidebar;
