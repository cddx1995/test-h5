<template>
	<view class="wrapper">
		<video
			class="video-container"
			:src="oVideo.link_url"
			loop="loop"
			autoplay="autoplay"
			muted="muted"
			x-webkit-airplay="true"
			x5-video-player-type="h5"
			x5-video-player-fullscreen="true"
			x5-video-ignore-metadata="true"
			object-fit="fill"
			controls="false"
		>
			<!-- <source src="http://images.gjys168.com/video/android_12123123709_1587117240223.mp4" type="video/mp4"></source> -->
		</video>
		<view class="content-container">
			<view class="top">
				<view class="return" @click="fnReturnPage"></view>
				<view class="title">{{ oVideo.title }}</view>
				<view class="more"></view>
			</view>
			<view class="operate">
				<view class="like">
					<view class="icon"></view>
					<view class="num">{{oVideo.praise_num}}</view>
				</view>
				<view class="comment">
					<view class="icon"></view>
					<view class="num">{{oVideo.comment_num}}</view>
				</view>
				<view class="gift">
					<view class="icon"></view>
				</view>
				<view class="share">
					<view class="icon"></view>
					<view class="num">{{oVideo.share_num}}</view>
				</view>
			</view>
			<view class="info">
				<view class="base-info">
					<view class="avatar"><img :src="oVideo.avatar" alt="" /></view>
					<view class="name">{{oVideo.company_name}}</view>
					<view class="guanzhu">关注</view>
				</view>
				<view class="detail-info"><p></p></view>
				<view class="tag">
					<ul>
						<li v-for="(item, index) in oVideo.tag" :key="index">#{{ item }}</li>
					</ul>
				</view>
			</view>
		</view>

		<!-- <view class="play-btn"></view> -->
		<view class="open-app-wrap"><span class="open-app">打开APP看更多视频</span></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			oVideo: {},
			bPlay: true
		};
	},
	methods: {
		fnGetInfo() {
			let _this = this;
			this.sendRequest({
				url: '/api/share/videoinfo',
				data: {
					video_id: 66
				},
				success: function(res) {
					console.log(res);
					if (!res.err && res.data) {
						_this.oVideo = res.data;
					}
				}
			});
		},
		fnReturnPage() {
			uni.navigateTo({
				url: '../index/index'
			});
		},
		fnTogglePlay(e) {
			this.videoContext = uni.createVideoContext(e.currentTarget.id, this);
			if (this.bPlay) {
				this.videoContext.pause();
				this.bPlay = false;
				
			} else {
				this.videoContext.play();
				this.bPlay = true;
			}
		}
	},
	onLoad() {
		this.fnGetInfo();
	}
};
</script>

<style lang="scss">
@import './video.scss';
</style>
