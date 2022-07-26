import {AppThunk} from '../../store';
import {addProject} from './api';

export const saveProject = (
    projectName:string,
    thumbnail:string
):AppThunk => async(dispatch,getState)=>{
  try{
      const response=await addProject(
          projectName,
          getState().strokes,
          thumbnail
      )
      console.log(response)
  } catch(err:any){
      console.log(err.message)
  }
}