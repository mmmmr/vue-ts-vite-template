import vSession from '@/utils/vSession'
// 获取缓存
export function getToken(): string {
  return vSession.get('token') || null
}