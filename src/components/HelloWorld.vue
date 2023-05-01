<template>
      <div class="header-name">
        Hey I am Adam Im a software developer specialised in front-end. If designer can sketch it, I can build it (with enough time and resources available)
        (Portfolio is currently undergoing design maintenance)
      </div>
      <table class="table-css">
        <tr>
          <th>Date</th>
          <th>Description</th>
        </tr>

        <tr>
          <td>2013</td>
          <td>
            Finished Sekolah Menengah Kebangsaan Sri Andalas
          </td>
        </tr>

        <tr>
          <td>2015 - 2017</td>
          <td>
            Finished Ungku Omar Polytechnic
          </td>
        </tr>

        <tr>
          <td>November 2016 - April 2017 (Intenship before graduating Ungku Omar Polytechnic)</td>
          <td>
            <span class="bolded-text">Front end Software Developer Intern</span> at Tripviss technology sdn bdn
            Description - Build web interface for Tripviss web application using ReactJS library while also learning basic knowledge about Typescript (new feature at that time). Other than that, learning with others tools such as Docker to help with the working environment.
          </td>
        </tr>

        <tr>
          <td>2017 - 2020</td>
          <td>
            Graduated National University of Malaysia (UKM)
          </td>
        </tr>

        <tr>
          <td>August 2019 - December 2019</td>
          <td>
            Full Stack Web Developer Intern at WorldQuest international
            Description - Made enhancement and maintaining in-house product using Reactjs. Calling API backend from server to make transaction. Made mobile application mockup of upcoming product using react natvie framework.
          </td>
        </tr>

        <tr>
          <td>February 2020 - December 2021</td>
          <td>
            Software Engineer at TalentCloud.ai
            Description - Develop and maintain in-house enterprise web application for various international and local client. Build user interface for several modules and functionality based on the user's requirement.
          </td>
        </tr>

        <tr>
          <td>December 2021 - Present</td>
          <td>
            System Engineer at Tata Consultanty Services
            Description - Development of an (Enterprise Service Postal) for a leading telecommunication company in Malaysia. Implemented functionality and UI/UX compnents based on user-stories and requirements provided by the client.
          </td>
        </tr>
      </table>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

table, th, td {
  color: white;
  border: 1px solid #ddd;
  border-collapse: collapse;
};

.body-section {
  display: flex;
}
.bolded-text {
  font-weight: 'bolder'
}

.table-css {
  position: absolute;
  bottom: 0px;
}

.header-name {
  height: 100px;
  position: sticky;
  position: web-sticky;
  top: 0;
  font-size: 25px;
  color: white;
}
</style>
