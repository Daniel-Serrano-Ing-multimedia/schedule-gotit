import React, { useState, useEffect } from 'react';
// lin router
import { useRouter } from 'next/router';
import Link from 'next/link';
// compponets
import BtnsContainer from './layout/BtnsContainer';
// contexts
import useProjects from '../context/hooks/useProjects';
import useTasks from '../context/hooks/useTasks';
//styles
import styles from '../styles/pages.module.scss';

const ProjectList = () => {
  // contexts 
  const projectsState = useProjects();
  const { projectsList, setCurrentProject } = projectsState;
  const tasksState = useTasks();
  const { getTasksProject } = tasksState;
  useEffect(() => {
  }, [  ])
  
  return ( 
    <>
      <section className = { styles.section }>
        
        <div className={ styles.tbl_header }>
            <table >
              <thead>
                  <tr>
                      <th>NOMBRE</th>
                      <th>HORAS RESTANTES</th>
                      <th>HORAS USADAS</th>
                      <th>HORAS TOTALES</th>
                      <th>FECHA DE INICIO</th>
                      <th></th>
                  </tr>
              </thead>
            </table>
        </div>
        <div className={ styles.tbl_content }>
            <table >
              <tbody>
                {projectsList.map( (project , index)=> 
                <>
                    <Project 
                      key = { index }
                      project = { project }
                      setCurrentProject = { setCurrentProject }
                      getTasksProject = { getTasksProject }
                    />
                </>
                )}
               
              </tbody>
            </table>
        </div>
        </section>
    </>
  );
}

const Project = ({ project, setCurrentProject, getTasksProject })  =>{
    // Router
    const router = useRouter();

  let name =project.name.length > 18 ? `${project.name.substring( 0, 20 )}...`: project.name;
  // calculate hours
  const showSstartDate = new Date(project.startDate)
  const hoursLeft = 0;
  const hoursUsed = 0;

  const linkProject =  id =>{
    setCurrentProject( project )
    getTasksProject( id );
    router.push( `/project/${ id }` )
  }

  return  (
    <tr>
      <td> { name }</td>
        <td>{ hoursLeft }</td>
        <td>{ hoursUsed}</td>
        <td>{ project.hoursTotal }</td>
        <td>{ showSstartDate.getFullYear() }</td>
        <td>
          <BtnsContainer
            itemID = { project._id }
            seeFunc ={ linkProject }
          />
        </td>
    </tr>    
  )
}

export default ProjectList;
