import { Link } from 'react-router-dom';

function HomePage() {
   return (
     <div style={styles.container}>
       <h1 style={styles.title}>Home Page of my site</h1>
       <p style={styles.subTitle}>Links to view:</p>
       <div style={styles.linksContainer}>
         <Link to="/degree" style={styles.link}>View Degrees</Link>
         <Link to="/cohort" style={styles.link}>View Cohorts</Link>
         <Link to="/module" style={styles.link}>View Modules</Link>
         <Link to="/module/module-to-cohort" style={styles.link}>View Modules in a Cohort</Link>
         <Link to="/student" style={styles.link}>View Student</Link>
       </div>
     </div>
   );
}

const styles = {
   container: {
     display: 'flex',
     flexDirection: 'column',
     alignItems: 'center',
     marginTop: '50px'
   },
   title: {
     fontSize: '32px',
     fontWeight: 'bold',
     marginBottom: '30px'
   },
   subTitle: {
     fontSize: '20px',
     marginBottom: '10px'
   },
   linksContainer: {
     display: 'flex',
     flexDirection: 'column',
     alignItems: 'center'
   },
   link: {
     fontSize: '18px',
     margin: '5px',
     padding: '10px',
     backgroundColor: '#4CAF50',
     color: 'white',
     borderRadius: '5px',
     textDecoration: 'none'
   }
};

export default HomePage;
