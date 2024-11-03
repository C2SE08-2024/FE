export const accountsData = [
    {
      account_id: 1,
      email: 'user1@example.com',
      username: 'user1',
      password: 'hashedpassword1',
      is_enable: true,
    },
    {
      account_id: 2,
      email: 'user2@example.com',
      username: 'user2',
      password: 'hashedpassword2',
      is_enable: true,
    },
  ];
  
  export const rolesData = [
    {
      role_id: 1,
      role_name: 'Admin',
    },
    {
      role_id: 2,
      role_name: 'Instructor',
    },
    {
      role_id: 3,
      role_name: 'Student',
    },
  ];
  
  export const accountRolesData = [
    {
      id: 1,
      account_id: 1,
      role_id: 1, // Admin role
    },
    {
      id: 2,
      account_id: 2,
      role_id: 3, // Student role
    },
  ];
  
  export const businessesData = [
    {
      business_id: 1,
      account_id: 1,
      business_code: 'BUS001',
      business_name: 'Tech Corp',
      business_email: 'contact@techcorp.com',
      business_phone: '123-456-7890',
      business_address: '123 Tech St, City, Country',
      business_img: 'path/to/image.jpg',
      description: 'A leading technology company',
      is_enable: true,
      founded_year: 2010,
      website: 'https://techcorp.com',
    },
  ];
  
  export const jobsData = [
    {
      job_id: 1,
      business_id: 1,
      job_title: 'Frontend Developer',
      job_description: 'Develop user-facing features using React.js',
      location: 'Remote',
      industry: 'Technology',
      requirements: 'Experience with React.js, TypeScript',
      status: 'Open',
      salary_range: '$60,000 - $80,000',
      job_type: 'Full-time',
      posting_date: new Date('2024-01-01'),
      expiry_date: new Date('2024-12-31'),
    },
  ];
  
  export const jobApplicationsData = [
    {
      job_application_id: 1,
      business_id: 1,
      job_id: 1,
      student_id: 1,
      application_date: new Date('2024-02-01'),
      status: 'Pending',
    },
  ];
  
  // Sample data for students
  export const studentsData = [
    {
      student_id: 1,
      account_id: 2,
      student_code: 'STU001',
      student_name: 'John Doe',
      student_email: 'johndoe@example.com',
      student_phone: '987-654-3210',
      student_address: '456 Student Ave, City, Country',
      date_of_birth: new Date('2000-05-15'),
      id_card: 'ID123456',
      student_img: 'path/to/student_image.jpg',
      is_enable: true,
      major: 'Computer Science',
      graduation_year: 2024,
    },
  ];