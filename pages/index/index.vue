<template>
	<view class="container">
		<!-- <view class="top-bar"></view> -->
		<view class="part1">
			<view class="login-box">
				<view class="login-container">
					<view class="login-content">
						<view class="phone">
							<view class="icon"><image src="../../static/img/phone_icon@2x.png" mode=""></image></view>
							<view class="input"><input type="number" v-model="iPhoneNumber" placeholder="请填写手机号" /></view>
						</view>
					</view>
					<view class="login-content">
						<view class="message">
							<view class="icon"><image src="../../static/img/message_icon@2x.png" mode=""></image></view>
							<view class="input"><input type="number" v-model="iCode" placeholder="请输入验证码" /></view>
						</view>
						<!-- 初始状态 -->
						<view v-show="!iPhoneNumber" class="code no-phone-number">获取验证码</view>
						<!-- 输入手机号后 -->
						<view v-show="!bHasGetCode && iPhoneNumber" @click="fnGetCode" class="code get-code">获取验证码</view>
						<!-- 等待验证码倒计时状态 -->
						<view v-show="bHasGetCode && !bHasCode && iPhoneNumber" class="code wait-code">重新获取({{ iCountTime }}s)</view>
						<view v-show="bHasGetCode && bHasCode && iPhoneNumber" class="code reget-code" @click="fnGetCode">重新获取验证码</view>
					</view>
				</view>
				<view class="begin" @click="fnBegin"></view>
			</view>
		</view>
		<view class="part2"></view>
		<view class="part3"></view>
		<view class="part4"></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			bHasGetCode: false, //第一次获取验证码
			bHasPhoneNumber: false,
			bWaitCode: false,
			bHasCode: false,
			iPhoneNumber: '',
			iCode: '',
			iCountTime: 60,
			bSuccessLogin: false //成功登录
		};
	},
	computed: {},
	watch: {},
	methods: {
		fnGetCode() {
			if (!this.iPhoneNumber) {
				return;
			}
			this.iCountTime = 60;
			this.bWaitCode = true;
			this.bHasGetCode = true;
			this.bHasCode = false;
			console.log(this.iCountTime);
			let that = this;
			let timer = setInterval(function() {
				if (that.iCountTime > 0) {
					that.iCountTime--;
				} else {
					that.bWaitCode = false;
					that.bHasCode = true;
					clearInterval(timer);
				}
			}, 1000);

			if (this.bWaitCode) {
				this.sendRequest({
					url: '/api/user/getCode',
					data: {
						phone: this.iPhoneNumber + ''
					},
					success: function(res) {
						// console.log('获取数据:' + JSON.stringify(res));
					}
				});
			}
		},
		fnBegin() {
			if (!this.iPhoneNumber) {
				uni.showModal({
					content: '请输入手机号！'
				});
				return
			} else if (!this.iCode) {
				uni.showModal({
					content: '请输入验证码！'
				});
				return
			}
			
			this.sendRequest({
				url: '/api/user/login',
				data: {
					username: this.iPhoneNumber + '',
					code: this.iCode,
					equipment: 4
				},
				success: function(res) {
					console.log('获取数据:' + JSON.stringify(res));
					// uni.navigateTo({
					// 	url: '../video/video'
					// });
				}
			});
		}
	}
};
</script>

<style lang="scss">
@import './index.scss';
</style>
