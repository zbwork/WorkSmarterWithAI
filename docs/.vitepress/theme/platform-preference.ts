import {ref,onMounted,onUnmounted} from 'vue'
import {contentConfig as c} from '../../../content.config'
export const preferredPlatform=ref('')
const valid=(s:string)=>c.apps.some(p=>p.slug===s)
export function savePlatform(slug:string){if(!valid(slug))return;preferredPlatform.value=slug;try{localStorage.setItem(c.platformPreferenceKey,slug)}catch{}}
export function usePlatformPreference(){
 function restore(){try{const value=localStorage.getItem(c.platformPreferenceKey)||'';preferredPlatform.value=valid(value)?value:''}catch{}}
 function storage(e:StorageEvent){if(e.key===c.platformPreferenceKey)restore()}
 onMounted(()=>{restore();addEventListener('storage',storage)});onUnmounted(()=>removeEventListener('storage',storage))
 return {preferredPlatform,savePlatform}
}
