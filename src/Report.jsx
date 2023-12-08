const Report = () => {
    return ( 
    <div className="report">
      <div className="report-nav">
        <h1 style={{color: 'rgb(3, 15, 77)'}}>Crime <span style={{color: 'yellow'}}>Watch</span></h1>
        <h2>Crime Monthly Report</h2>
      </div>
      <section className="reports">
        <div className="monthly-report">
          <h4>January</h4>
          <table>
            <tr>
              <th>Crime ID</th>
              <th>Crime Title</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
            <tr>
              <td>CRM0001</td>
              <td>Exams Malpractice</td>
              <td>02/2/2015</td>
              <td>Resolved</td>
            </tr>
              <tr>
                <td>CRM0002</td>
                <td>Misbehaving</td>
                <td>02/2/2013</td>
                <td>Resolved</td>
              </tr>
              <tr>
                <td>CRM0001</td>
                <td>Fighting</td>
                <td>02/2/2016</td>
                <td>Resolved</td>
              </tr>
          <button>Sent Report</button>
          </table>
         </div>
      </section>
    </div> );
}
 
export default Report;