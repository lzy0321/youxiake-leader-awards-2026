const detailId=Number(new URLSearchParams(location.search).get('leader')||1);
const detailLeader=leaderRanking.find(l=>l.rank===detailId);
if(detailLeader){
 document.getElementById('detailAvatar').src=leaderAvatar(detailLeader.rank);
 document.getElementById('detailName').textContent=detailLeader.name;
 document.getElementById('detailStation').textContent=detailLeader.station;
 document.getElementById('detailTotal').textContent=detailLeader.votes+'票';
 // Split the mock baseline into three sources; real source totals will come from the activity service.
 const added=Number(votingState.votes[detailId]||0),baseline=detailLeader.votes-added;
 const interactions=Math.floor(baseline*.4/3),socialVotes=interactions*3,photoLikes=Math.floor(baseline*.2),userVotes=baseline-socialVotes-photoLikes+added;
 const likes=Math.floor(interactions*.6),saves=Math.floor(interactions*.25),comments=interactions-likes-saves;
 const sources=[
 {title:'小红书互动',value:socialVotes,formula:`${interactions.toLocaleString()} 次互动 × 3`,detail:`点赞 ${likes} · 收藏 ${saves} · 评论 ${comments}`,rule:'统计活动期间发布的游侠客相关内容，话题须包含 #游侠客 #游侠客领队 #我的领队会发光 及 OPPO 指定话题（待定）。'},
 {title:'用户投票',value:userVotes,formula:'每次消耗 1 追光值，按身份计入 1–3 票',detail:'普通用户 ×1 · 出行用户 ×2 · 与领队同团 ×3',rule:'每人每天默认有 3 追光值，完成主会场任务可获得更多；当天未使用的追光值全部清空。'},
 {title:'摄影展点赞',value:photoLikes,formula:`${photoLikes.toLocaleString()} 个点赞 × 1`,detail:'线上摄影展照片的遇见点赞',rule:'统计活动期间领队在线上摄影展照片获得的点赞，每个点赞计 1 追光值。'}
 ];
 const hasContent=content=>Boolean(content?.url?.trim()&&content?.title?.trim());
 if(!hasContent(detailLeader.promotions?.xiaohongshu))sources[0]={title:'小红书互动',value:null};
 if(!hasContent(detailLeader.promotions?.yujian))sources[2]={title:'摄影展点赞',value:null};
 const container=document.getElementById('voteRecords');
 sources.forEach((source,index)=>{const card=document.createElement('section');card.className='vote-source';const header=document.createElement('div');header.className='vote-source-heading';const title=document.createElement('h3');title.textContent=source.title;const total=document.createElement('strong');total.textContent=source.value===null?'—':source.value.toLocaleString()+'票';header.append(title,total);if(source.value===null){card.classList.add('vote-source-empty');card.append(header);const empty=document.createElement('p');empty.className='vote-source-formula';empty.textContent='暂无相关内容';card.append(empty);container.append(card);return;}const formula=document.createElement('p');formula.className='vote-source-formula';formula.textContent=source.formula;const detail=document.createElement('p');detail.className='vote-source-detail';detail.textContent=source.detail;card.append(header,formula);if(index===0)card.append(detail);container.append(card)});
}else{document.querySelector('.vote-detail-summary').textContent='未找到该领队';}
