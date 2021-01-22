import FS from 'fs-extra';
import path from 'path';
import ejs from 'ejs';
import { ISifou } from './utils/getSifou';

import { IToutiaoData, I36KrData } from './utils'

const rootPath: string = path.join(__dirname, 'html');
const dateStr: string = `${new Date().getFullYear()}/${(new Date().getMonth()) + 1}/${new Date().getDate()}`;

export interface ICreateFollowersHTML {
  html_url: string;
  avatar_url: string;
  name: string | null;
  login: string;
  location: string | null;
  public_repos: number;
  followers: number;
  [key: string]: any;
}

export function creatFollowersHTML(userData: ICreateFollowersHTML[], type: string): string {
  const filename: string = path.join(rootPath, 'followers.ejs');
  const tmpStr: string = FS.readFileSync(filename).toString();
  let title = 'Github 中国区用户排行榜';
  if (type === 'global') {
    title = 'Github 全球用户排行榜'
  }
  return ejs.render(tmpStr, {
    title,
    description: 'Github 是全球最大的开源组织，这里收集 Github 中国区及全球粉丝最多的用户',
    users: userData, date: dateStr, type }, { filename });
}

export interface IReposHTML {
  html_url: string;
  full_name: string;
  [key: string]: any;
}

export function creatReposHTML(reposData: IReposHTML[]) {
  const filename: string = path.join(rootPath, 'repos.ejs');
  const tmpStr: string = FS.readFileSync(filename).toString();
  return ejs.render(tmpStr, { title: 'Github 仓库排行榜',
    description: 'Github 是全球最大的开源组织，这里是世界上最受欢迎的仓库，包括 Vue、React、VSCode 等',
    repos: reposData, date: dateStr }, { filename });
}

export interface ICreateTrendingHTML {
  html_url: string;
  full_name: string;
  language: string;
  stargazers_count: number;
  todayStar: string;
  description: string;
}

export function creatTrendingHTML(trendingData: ICreateTrendingHTML[], type: string = 'daily') {
  const filename: string = path.join(rootPath, 'trending.ejs');
  const tmpStr: string = FS.readFileSync(filename).toString();
  return ejs.render(tmpStr, {
    title: 'Github 仓库趋势榜',
    description: 'Github 全球最大的开源组织，这里收集 Github 仓库每天的趋势榜，从这里你可以知道全球的技术趋势',
    trending: trendingData,
    date: dateStr,
    type
  }, { filename });
}

export function creatSifouHTML(sifouData: ISifou[], type: string = 'daily') {
  const filename: string = path.join(rootPath, 'sifou.ejs');
  const tmpStr: string = FS.readFileSync(filename).toString();
  return ejs.render(tmpStr, {
    title: 'Segmentfault 热门文章',
    description: 'Segmentfault 是中国知名的程序员问答及技术专栏网站，这里收集着每天、每周、每月最受用户欢迎的文章。这些高质量文章不仅有各大厂的优秀员工对特定技术的深入探索，而且还关于面试辅导、前端面试题等',
    data: sifouData, date: dateStr, type }, { filename });
}


export function creatToutiaoHTML(data: IToutiaoData[], day: number = 7) {
  const filename: string = path.join(rootPath, `toutiao.ejs`);
  const tmpStr: string = FS.readFileSync(filename).toString();
  return ejs.render(tmpStr, {
    title: `开发者头条热门文章 | 最近${day}天`, 
    description: '开发者头条中的头条，互联网最优秀的技术文章都汇聚于此，包括 Java/Go/Python/Redis/MySQL/k8s/Docker 等等',
    data, date: dateStr, day }, { filename });
}


export function creat36KrHTML(data: I36KrData[]) {
  const filename: string = path.join(rootPath, `36kr.ejs`);
  const tmpStr: string = FS.readFileSync(filename).toString();
  return ejs.render(tmpStr, { title: `36Kr 快讯`, description: '', data, date: dateStr }, { filename });
}