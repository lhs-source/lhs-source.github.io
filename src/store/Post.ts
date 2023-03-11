export interface Post {
  url: string;          // 포스트 경로
  fileName: string;     // 포스트 파일명
  title: string;        // 제목
  description: string;  // 요약
  tags: string[];       // 태그
  data?: string;        // 포스트 내용
  thumbnail?: string;   // 섬네일 URL
}