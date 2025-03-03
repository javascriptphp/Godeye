# 使用官方的 Node.js 作为基础镜像
FROM node:18-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 并安装依赖
COPY package*.json ./
RUN npm install --production && npm cache clean --force

# 复制源代码到容器
COPY . .

# 构建应用
RUN npm run build

# 仅拷贝构建产物（例如 .next 文件夹）
# 多阶段构建，减小最终镜像大小
FROM node:18-alpine AS runner

WORKDIR /app

# 复制构建结果到 runner 阶段的镜像中
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# 环境变量
ENV NODE_ENV=production

# 暴露端口
EXPOSE 8000

ENV PORT=8000
# 启动 Next.js 应用
CMD ["npm", "run", "start"]
