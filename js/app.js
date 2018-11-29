const baseUrl = 'https://api.dataatwork.org/v1/jobs'

async function getJobs(jobsUrl){
    let jobs = await fetch(jobsUrl)
    jobs = await jobs.json()
    list(jobs)
}

function list(jobsList){
    jobsList.forEach(function(job,index) {
        showJob(job, index)
    });
}

function showJob(job, index) {
    if(job.title){
    $('#app').append(`<article class="jobName">
                      <h3 id="${index}">${job.title}</h3>
                      </article>`)
    document.getElementById(index).addEventListener("click", function(){
        getJobDetail(job.uuid)
    });
    }
}

async function getJobDetail(jobId){
    let jobDescription = await fetch(`${baseUrl}/${jobId}/related_skills`)
    jobDescription = await jobDescription.json()
    $('#app').hide(1000) 
    showOnlyThisJobSkills(jobDescription)
}

function showOnlyThisJobSkills(jobAndSkills) {
    $('#detail').hide()
    $('#detail').append(`<article>
                         <h3>${jobAndSkills.job_title}</h3>   
                         </article>`)
    let skills = jobAndSkills.skills // saco el array del objeto
    skills = skills.slice(0,25) // 26 skills is enough (there are 200) 
    $('#skills').hide()                    
    skills.forEach(function(skill) {   // {elemento.skill_name}
        $('#skills').append(`${skill.skill_name}<br>`)    
    });
    $('#detail').show(3000)
    $('#skills').show(4000)

    showForm()
}

function showForm(){
    const form = `
    <form class="form" method="post" enctype="multipart/form-data">
    First name:<input type="text" name="nombre"><br>
    Surname:<input type="text" name="surname"><br>
    Email:<input type="text" name="email"><br>

    <input type="file" name="files[]" multiple>
    <input type="submit" value="Upload File" name="submit">
    </form>`
    $('#form').hide()
    $('#form').append(form)
    $('#form').show(6000)
}


getJobs(baseUrl) // <- lets begin the party



