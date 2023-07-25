using Sabio.Data.Providers;
using Sabio.Models.Domain.UserDemographics;
using Sabio.Models.Requests.UserDemographicsRequests;
using System.Data.SqlClient;
using System.Data;
using Sabio.Data;

namespace Sabio.Services
{
    public class UserDemographicsService : IUserDemographicsService
    {
        private IDataProvider _data;

        public UserDemographicsService(IDataProvider data)
        {
            _data = data;
        }

        public int Add(UserDemographicsAddRequest model, int userId)
        {
            int id = 0;

            string procName = "dbo.UserDemographics_Insert";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@UserId", userId);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;
                col.Add(idOut);
            },
                returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@Id"].Value;
                    int.TryParse(oId.ToString(), out id);
                });

            return id;
        }
        public void Update(UserDemographicsUpdateRequest model, int userId)
        {
            string procName = "dbo.UserDemographics_UpdateById";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)

            {
                AddCommonParams(model, col);
                col.AddWithValue("@Id", model.Id);
                col.AddWithValue("@UserId", userId);

            }, returnParameters: null);
        }

        public UserDemographics GetById(int id)
        {
            UserDemographics userDemographics = null;
            string procName = "dbo.UserDemographics_SelectById";

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection param)
            {
                param.AddWithValue("@Id", id);
            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int index = 0;
                userDemographics = MapSingleUserDemographics(reader, ref index);

            });

            return userDemographics;
        }

        public void Delete(int id, int userId)
        {
            string procName = "dbo.UserDemographics_DeleteById";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
                col.AddWithValue("@UserId", userId);

            }, returnParameters: null);
        }
        private static void AddCommonParams(UserDemographicsAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@PreferredName", model.PreferredName);
            col.AddWithValue("@Pronunciation", model.Pronunciation);
            col.AddWithValue("@AboutMe", model.AboutMe);
            col.AddWithValue("@GenderId", model.GenderId);
        }

        private UserDemographics MapSingleUserDemographics(IDataReader reader, ref int index)
        {
            UserDemographics userDemographics = new UserDemographics();

            userDemographics.PreferredName = reader.GetString(index++);
            userDemographics.Pronunciation = reader.GetString(index++);
            userDemographics.AboutMe = reader.GetString(index++);
            userDemographics.GenderId = reader.GetSafeInt32(index++);
           
            userDemographics.Id = reader.GetSafeInt32(index++);

            return userDemographics;
        }

    }
}
