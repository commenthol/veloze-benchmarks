function Employee({ id = null, title = null, employer = null } = {}) {
  this.id = id
  this.title = title
  this.employer = employer
}

export function getJobs (num = 200) {
  const jobs = []

  for (let i = 0; i < num; i += 1) {
    jobs[i] = new Employee({
      id: i,
      title: 'Software engineer',
      employer: 'acme corp'
    })
  }

  return jobs
}
